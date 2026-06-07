// routes/dashboard/dashboard.tsx
import PendingInvoicesTable from "@/features/dashboard/components/pendingInvoicesTable";
import RecentInvoicesTable from "@/features/dashboard/components/recentInvoicesTable";
import StatsCards from "@/features/dashboard/components/statsCards";
import { TopProductsChart } from "@/features/dashboard/components/topProductChart";
import { TrendChart } from "@/features/dashboard/components/trendChart";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { usePendingInvoices } from "@/features/dashboard/hooks/usePendingInvoices";
import { useRecentInvoices } from "@/features/dashboard/hooks/useRecentInvoices";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";

export default function Dashboard() {
    const { data: dashboardData, isLoading: statsLoading } = useDashboardStats();
    const { data: recentData, isLoading: recentLoading } = useRecentInvoices(5);
    const { data: pendingData, isLoading: pendingLoading } = usePendingInvoices(5);

    const isLoading = statsLoading || recentLoading || pendingLoading;

    if (isLoading) return <LoadingSpinner />;
    
    return (
        <main className="text-right">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">داشبورد</h1>
            </div>
            
            <StatsCards dashboardData={dashboardData} />

            <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
                <RecentInvoicesTable recentData={recentData} />
                <PendingInvoicesTable pendingData={pendingData} />
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4">
                {dashboardData?.trends && (
                    <TrendChart chartData={dashboardData?.trends} />
                )}
                {dashboardData?.top_products && (
                    <TopProductsChart chartData={dashboardData?.top_products} />
                )}
            </div>
        </main>
    );
}