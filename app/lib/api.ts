import { getStoredToken } from "./authStorage";

const API_BASE_URL = "https://invociemanager-production.up.railway.app";

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

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = getStoredToken();

    let headers: Record<string, string> = {
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
            throw new Error("Session expired");
        }

        headers.Authorization = `Bearer ${newAccess}`;
        res = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers,
        });
    }

    const text = await res.text();
    let data;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = { message: text };
    }

    if (!res.ok) {
        console.log(data);
        throw data;
    }

    return data;
}
