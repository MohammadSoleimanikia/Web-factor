import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
/**
 * Build the correct logo URL
 * Handles both private (relative path) and public (may include domain) responses
 */
export function buildLogoUrl(logo: string | null | undefined): string | null {
    if (!logo) return null;

    // If already a full URL, return as-is
    if (logo.startsWith("http")) {
        return logo;
    }

    // If it has /account in the path, it likely doesn't need the domain prefix
    if (logo.startsWith("/account")) {
        return `https://yasinhossini94.pythonanywhere.com${logo}`;
    }

    // Otherwise, it's a relative media path - add the account prefix
    return `https://yasinhossini94.pythonanywhere.com/account${logo}`;
}
export function phoneFormatter(phone: string | undefined | null): string {
    if (!phone) return "";
    return phone.startsWith("+98") ? "0" + phone.slice(3) : phone;
}