import { useCacheStore } from "@/store/cacheStore";

import { getStoredToken } from "./authStorage";
import { INVALIDATION_MAP } from "./cacheKeys";

const API_BASE_URL = "https://yasinhossini94.pythonanywhere.com";

async function refreshToken() {
    const token = getStoredToken();
    if (!token?.refresh) return null;

    const res = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: token.refresh }),
    });

    if (!res.ok) return null;

    const newToken = await res.json();

    // update zustand persisted state
    const saved = JSON.parse(localStorage.getItem("auth")!);
    saved.state.token.access = newToken.access;
    localStorage.setItem("auth", JSON.stringify(saved));

    return newToken.access;
}

/**
 * Helper to handle cache invalidation based on request type
 */
function getInvalidationKeys(url: string, method?: string): string[] {
    const keys: string[] = [];

    // Invoices
    if (url.includes("/user/invoices/")) {
        if (method === "POST") {
            keys.push(...INVALIDATION_MAP.POST_INVOICE);
        } else if (method === "PUT" || method === "PATCH") {
            keys.push(...INVALIDATION_MAP.PUT_INVOICE);
        } else if (method === "DELETE") {
            keys.push(...INVALIDATION_MAP.DELETE_INVOICE);
        }
    }

    // Products
    if (url.includes("/user/products/")) {
        if (method === "POST") {
            keys.push(...INVALIDATION_MAP.POST_PRODUCT);
        } else if (method === "PUT" || method === "PATCH") {
            keys.push(...INVALIDATION_MAP.PUT_PRODUCT);
        } else if (method === "DELETE") {
            keys.push(...INVALIDATION_MAP.DELETE_PRODUCT);
        }
    }

    // Profile
    if (url.includes("/account/profile/")) {
        if (method === "PUT" || method === "PATCH") {
            keys.push(...INVALIDATION_MAP.PUT_PROFILE);
        }
    }

    return [...new Set(keys)]; // Remove duplicates
}

export async function apiFetch<T>(
    url: string,
    options: RequestInit = {},
): Promise<T> {
    const cacheStore = useCacheStore.getState();
    const method = options.method?.toUpperCase() || "GET";

    // ✅ For GET requests, check cache first
    if (method === "GET") {
        const cachedData = cacheStore.getCache<T>(url);
        if (cachedData !== null) {
            console.log(`[CACHE HIT] ${url}`);
            return cachedData;
        }
    }

    // 🌐 If no cache or not GET, fetch from API
    const token = getStoredToken();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token?.access) {
        headers.Authorization = `Bearer ${token.access}`;
    }

    let res = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        const newAccess = await refreshToken();

        if (!newAccess) {
            localStorage.removeItem("auth");
            window.location.href = "/login";
            throw {
                status: 401,
                message: "Session expired",
            };
        }

        headers.Authorization = `Bearer ${newAccess}`;
        res = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });
    }

    const text = await res.text();
    let data: any = null;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = { message: text };
    }

    if (!res.ok) {
        throw {
            status: res.status,
            message:
                data?.message ||
                Object.values(data || {})[0] ||
                "Unknown error",
            errors: data,
        };
    }

    // ✅ Success! If GET, cache it
    if (method === "GET") {
        cacheStore.setCache<T>(url, data);
        console.log(`[CACHE SET] ${url}`);
    }

    // 🗑️ If POST/PUT/DELETE, invalidate related caches
    if (method !== "GET") {
        const keysToInvalidate = getInvalidationKeys(url, method);
        if (keysToInvalidate.length > 0) {
            cacheStore.invalidateCache(keysToInvalidate);
            console.log(`[CACHE INVALIDATED] ${keysToInvalidate.join(", ")}`);
        }
    }

    return data as T;
}
