import {
    ChevronDown,
    ChevronUp,
    CircleUserRound,
    Home,
    LogOut,
    Package,
    ScrollText,
    Settings,
    User2,
    Users,
} from "lucide-react";
import { NavLink } from "react-router";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import useAuth from "@/store/auth";
import type { AuthContextType } from "@/types/authContext";

import { ModeToggle } from "./modeToggle";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
// Menu items.
const productItems = [
    {
        title: "خانه",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "فاکتور ها",
        url: "/invoices",
        icon: ScrollText,
    },
    {
        title: "کالا ها",
        url: "/products",
        icon: Package,
    },
    {
        title: "مشتریان",
        url: "/customers",
        icon: Users,
    },
];

const userItems = [
    {
        title: "پروفایل",
        url: "/profile",
        icon: CircleUserRound,
    },
    {
        title: "تنظیمات",
        url: "#",
        icon: Settings,
    },
];

export function AppSidebar() {
    const logOut = useAuth((state: AuthContextType) => state.logOut);
    return (
        <Sidebar className="print:hidden print:m-0" side="left">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {productItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarSeparator />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                تنظیمات
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent />
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {userItems.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <NavLink to={item.url}>
                                                        <item.icon />
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </NavLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                        <SidebarMenuItem>
                                            <ModeToggle />
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> حساب کاربری
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem
                                    onClick={logOut}
                                    className="flex justify-end"
                                >
                                    <span>خروج</span>
                                    <LogOut />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
