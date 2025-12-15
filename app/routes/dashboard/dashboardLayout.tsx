import { AppSidebar } from "@/components/sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="overflow-hidden">
                    <SidebarTrigger className="md:hidden"/>
                    <main className="flex flex-1 flex-col p-4">
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
