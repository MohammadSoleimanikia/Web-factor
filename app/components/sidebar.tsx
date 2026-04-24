import {
    ChevronDown,
    ChevronUp,
    CircleUserRound,
    Home,
    LogOut,
    Package,
    ScrollText,
    User2,
    Users,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
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
];

export function AppSidebar() {
    const path = useLocation().pathname;
    const logOut = useAuth((state: AuthContextType) => state.logOut);
    const sidebarButtonGradientClass =
        "bg-linear-to-r from-sidebar-primary/30 to-sidebar-accent/40 hover:from-sidebar-primary/45 hover:to-sidebar-accent/55 data-[active=true]:from-sidebar-primary data-[active=true]:to-sidebar-accent data-[active=true]:text-white";
    return (
        <Sidebar
            className="print:hidden print:m-0 border-l "
            dir="ltr"
            side="right"
        >
            <SidebarHeader>
                <img src="/logo.svg" alt="Logo" className="w-4/6 mx-auto " />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {productItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`flex-row-reverse sm:flex-row   ${sidebarButtonGradientClass}`}
                                        isActive={path === item.url}
                                    >
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
                <Collapsible className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger className=" flex-row-reverse sm:flex-row">
                                <span className="text-base">تنظیمات</span>
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
                                                <SidebarMenuButton
                                                    asChild
                                                    className={`flex-row-reverse sm:flex-row ${sidebarButtonGradientClass}`}
                                                    isActive={path === item.url}
                                                >
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
                                <SidebarMenuButton
                                    className={`flex-row-reverse sm:flex-row ${sidebarButtonGradientClass}`}
                                >
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
