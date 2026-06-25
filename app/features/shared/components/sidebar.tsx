import {
    FolderTree,
    Home,
    Package,
    ScrollText,
    ShoppingCart,
    Users,
} from "lucide-react";
import { NavLink, useLocation } from "react-router";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/features/shared/components/ui/sidebar";
import { SubscriptionStatusMini } from "@/features/subscription/components/SubscriptionStatusMini";

// Menu items.
const productItems = [
    {
        title: "داشبورد",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "فاکتور ها",
        url: "/invoices",
        icon: ScrollText,
    },
    {
        title: "فاکتورهای خرید",
        url: "/purchase-invoices",
        icon: ShoppingCart,
    },
    {
        title: "کالا ها",
        url: "/products",
        icon: Package,
    },
    {
        title: "دسته‌بندی کالاها",
        url: "/categories",
        icon: FolderTree,
    },
    {
        title: "مشتریان",
        url: "/customers",
        icon: Users,
    },
    
];

function isMenuItemActive(path: string, url: string) {
    if (url === "/dashboard") {
        return path === "/dashboard";
    }

    return path === url || path.startsWith(`${url}/`);
}

export function AppSidebar() {
    const path = useLocation().pathname;

    const sidebarButtonGradientClass =
        "bg-linear-to-r from-sidebar-primary/30 to-sidebar-accent/40 hover:from-sidebar-primary/45 hover:to-sidebar-accent/55 data-[active=true]:from-sidebar-primary data-[active=true]:to-sidebar-accent data-[active=true]:text-white";

    return (
        <Sidebar
            className="print:hidden print:m-0 border-l"
            dir="ltr"
            side="right"
        >
            <SidebarHeader>
                <img src="/logo.svg" alt="Logo" className="w-6/12 mx-auto" />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {productItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={`flex-row-reverse sm:flex-row ${sidebarButtonGradientClass}`}
                                            isActive={isMenuItemActive(
                                                path,
                                                item.url,
                                            )}
                                        >
                                            <NavLink to={item.url}>
                                                <Icon />
                                                <span>{item.title}</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}

                            <SidebarSeparator />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SubscriptionStatusMini />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}