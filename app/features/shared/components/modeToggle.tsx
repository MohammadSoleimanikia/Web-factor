import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/features/shared/components/themeProvider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/features/shared/components/ui/dropdown-menu";

import { SidebarMenuButton } from "./ui/sidebar";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="bg-linear-to-r from-sidebar-primary/30 to-sidebar-accent/40 hover:from-sidebar-primary/45 hover:to-sidebar-accent/55 data-[active=true]:from-sidebar-primary data-[active=true]:to-sidebar-accent data-[active=true]:text-sidebar-primary-foreground">
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                        {theme == "system" ? (
                            <span> سیستم</span>
                        ) : theme == "dark" ? (
                            <span> تاریک</span>
                        ) : (
                            <span> روشن</span>
                        )}
                        <span className="sr-only">تغییر حالت تاریک و روشن</span>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 flex flex-col"
                    align="start"
                >
                    <div className="px-2 py-1.5 text-sm font-semibold flex justify-end">
                        {theme === "system"
                            ? " سیستم"
                            : theme === "dark"
                              ? "تاریک"
                              : " روشن"}
                    </div>
                    <div className="h-px bg-border" />
                    <DropdownMenuItem
                        className="flex justify-end"
                        onClick={() => setTheme("light")}
                    >
                        حالت روشن
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex justify-end"
                        onClick={() => setTheme("dark")}
                    >
                        حالت تاریک
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex justify-end"
                        onClick={() => setTheme("system")}
                    >
                        سیستم
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
