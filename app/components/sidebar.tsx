import { Users, Home, Package, Settings, ScrollText } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

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
        url: "#",
        icon: Users,
    },

    {
        title: "تنظیمات",
        url: "#",
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>دشبورد</SidebarGroupLabel>
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
            </SidebarContent>
        </Sidebar>
    );
}
