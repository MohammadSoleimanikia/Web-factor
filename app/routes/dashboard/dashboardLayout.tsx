// routes/dashboard/dashboardLayout.tsx
import { Outlet } from "react-router";

import { DashboardHeader } from "@/features/dashboard/components/dashboardHeader";
import { AppSidebar } from "@/features/shared/components/sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/features/shared/components/ui/sidebar";

export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden">
                {/* هدر با دکمه سایدبار و آواتار */}
                <div className="sticky top-0 z-10 bg-background border-b">
                    <div className="flex items-center justify-between px-4 py-2">
                        <SidebarTrigger className="md:flex print:hidden" />
                        <DashboardHeader />
                    </div>
                </div>
                <main className="flex-1 overflow-y-auto p-4 print:p-0">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
