import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
/**
 * Build the correct logo URL
 * Handles both private (relative path) and public (may include domain) responses
 */
export function buildLogoUrl(
    logo: string | null | undefined,
    cacheBust?: string | number | null,
): string | null {
    if (!logo) return null;

    const appendCache = (url: string) => {
        if (cacheBust === undefined || cacheBust === null) return url;
        const sep = url.includes("?") ? "&" : "?";
        return `${url}${sep}cb=${encodeURIComponent(String(cacheBust))}`;
    };

    // If already a full URL, return as-is (with optional cache-bust)
    if (logo.startsWith("http")) {
        return appendCache(logo);
    }

    // If it's a /media path, it's already a full relative path - just add domain
    if (logo.startsWith("/media")) {
        return appendCache(`https://yasinhossini94.pythonanywhere.com${logo}`);
    }

    // If it has /account in the path, return as-is with domain
    if (logo.startsWith("/account")) {
        return appendCache(`https://yasinhossini94.pythonanywhere.com${logo}`);
    }

    // Otherwise, it's a relative path without leading / - add the account prefix
    return appendCache(
        `https://yasinhossini94.pythonanywhere.com/account${logo}`,
    );
}
export function phoneFormatter(phone: string | undefined | null): string {
    if (!phone) return "";
    return phone.startsWith("+98") ? "0" + phone.slice(3) : phone;
}
