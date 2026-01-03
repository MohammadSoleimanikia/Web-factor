import { ChevronDown, Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/themeProvider";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "./ui/sidebar";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                        {
                            theme == "system" ? <span> سیستم</span>:
                            theme == "dark" ? <span> تاریک</span>:
                            <span> روشن</span>
                        }
                        <span className="sr-only">تغییر حالت تاریک و روشن</span>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        حالت روشن
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        حالت تاریک
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
           
        </>
    );
}
