import "./app.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import { ThemeProvider } from "@/features/shared/components/themeProvider";
import { DirectionProvider } from "@/features/shared/components/ui/direction";
import { Toaster } from "@/features/shared/components/ui/sonner";

import { TooltipProvider } from "./features/shared/components/ui/tooltip";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                {/* ⚡ بهینه‌سازی فونت‌ها */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />

                {/* ⚡⚡ حیاتی: preload با fetchpriority بالا */}
                <link
                    rel="preload"
                    href="/fonts/Vazir.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                    fetchPriority="high"
                />

                {/* پیش‌بارگذاری فونت ارقام با اولویت پایین‌تر */}
                <link
                    rel="preload"
                    href="/fonts/Vazir-FD-WOL.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />

                <Meta />
                <Links />
            </head>
            <body suppressHydrationWarning>
                <DirectionProvider dir="rtl">
                    <TooltipProvider>{children}</TooltipProvider>
                </DirectionProvider>
                <ScrollRestoration />
                <Scripts />
                <Toaster />
            </body>
        </html>
    );
}
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});
export default function App() {
    return (
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <div className="font-vazir">
                    <Outlet />
                </div>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export { default as ErrorBoundary } from "./routes/ErrorPage";
