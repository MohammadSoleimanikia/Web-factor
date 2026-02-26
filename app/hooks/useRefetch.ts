/**
 * Hook for easier refetching data after cache invalidation
 * Usage: const refetch = useRefetch();
 * Then: await refetch('/user/invoices/');
 */

import { getStoredToken } from "@/lib/authStorage";
import { useCacheStore } from "@/store/cacheStore";

export function useRefetch() {
    const { setCache } = useCacheStore();

    return async function refetch<T>(
        url: string,
        options: RequestInit = {},
    ): Promise<T | null> {
        try {
            const API_BASE_URL = "https://yasinhossini94.pythonanywhere.com";

            const token = getStoredToken();
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (token?.access) {
                headers.Authorization = `Bearer ${token.access}`;
            }

            const res = await fetch(`${API_BASE_URL}${url}`, {
                ...options,
                headers,
            });

            if (!res.ok) {
                return null;
            }

            const data = (await res.json()) as T;

            // Cache the result again
            setCache<T>(url, data);
            console.log(`[REFETCH + CACHE] ${url}`);

            return data;
        } catch (error) {
            console.error(`[REFETCH ERROR] ${url}`, error);
            return null;
        }
    };
}
