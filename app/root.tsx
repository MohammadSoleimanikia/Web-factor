import "./app.css";

import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";

import { ThemeProvider } from "@/components/themeProvider";
import { DirectionProvider } from "@/components/ui/direction";
import { Toaster } from "@/components/ui/sonner";

import type { Route } from "./+types/root";
import { TooltipProvider } from "./components/ui/tooltip";

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
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                
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
                
                {/* ⚡ کاهش CSS رندر بلاک کننده */}
                <link 
                    rel="preload" 
                    href="/assets/root-3sitnf4R.css" 
                    as="style" 
                    fetchPriority="high"
                />
                
                <Meta />
                <Links />
            </head>
            <body suppressHydrationWarning>
                <DirectionProvider dir="rtl">
                    <TooltipProvider>
                        {children}
                    </TooltipProvider>
                </DirectionProvider>
                <ScrollRestoration />
                <Scripts />
                <Toaster />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <div className="font-vazir">
                <Outlet />
            </div>
        </ThemeProvider>
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}