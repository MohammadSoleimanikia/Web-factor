import { Outlet } from "react-router";

import { AppSidebar } from "@/features/shared/components/sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/features/shared/components/ui/sidebar";

export default function DashboardLayout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="overflow-hidden">
                    <SidebarTrigger className="md:hidden print:hidden print:m-0" />
                    <main className="flex flex-1 flex-col p-4 print:p-0">
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
