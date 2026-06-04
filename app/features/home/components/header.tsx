import { Link, NavLink } from "react-router";

import ThemeToggler from "@/features/home/components/themeToggler";
import { Button } from "@/features/shared/components/ui/button";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        className="h-8 w-auto"
                        src="/logo.svg"
                        alt="وب فاکتور"
                    />
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                        وب فاکتور
                    </span>
                </Link>
                <div className="flex items-center gap-3">
                    <ThemeToggler />
                    <Link to="/demo">
                        <Button variant="outline" size="sm">
                            دمو
                        </Button>
                    </Link>
                    <NavLink to="/dashboard">
                        <Button size="sm">ورود/عضویت</Button>
                    </NavLink>
                </div>
            </div>
        </header>
    );
}
