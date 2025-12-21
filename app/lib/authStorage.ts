import type { Token } from "@/types/token";

export function getStoredToken(): Token | null {
    const saved = localStorage.getItem("token");
    if (!saved) return null;

    try {
        const parsed = JSON.parse(saved);
        return parsed.state?.token ?? null;
    } catch {
        return null;
    }
}
