import {
    Users,
    Home,
    Package,
    Settings,
    ScrollText,
    User2,
    ChevronUp,
    LogOut,
    CircleUserRound,
    ChevronDown,
    Palette,
} from "lucide-react";

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
import { NavLink } from "react-router";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import useAuth from "@/store/auth";
import { ModeToggle } from "./modeToggle";
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
    const logOut = useAuth((state) => state.logOut);
    return (
        <Sidebar className="print:hidden print:m-0" side="right">
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
