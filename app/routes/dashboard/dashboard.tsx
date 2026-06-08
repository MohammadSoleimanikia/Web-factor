import { X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

import PendingInvoicesTable from "@/features/dashboard/components/pendingInvoicesTable";
import RecentInvoicesTable from "@/features/dashboard/components/recentInvoicesTable";
import StatsCards from "@/features/dashboard/components/statsCards";
import { TopProductsChart } from "@/features/dashboard/components/topProductChart";
import { TrendChart } from "@/features/dashboard/components/trendChart";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { usePendingInvoices } from "@/features/dashboard/hooks/usePendingInvoices";
import { useRecentInvoices } from "@/features/dashboard/hooks/useRecentInvoices";
import { useProfile } from "@/features/profile/hooks/useProfile";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";
import { SubscriptionStatusMini } from "@/features/subscription/components/SubscriptionStatusMini";

export default function Dashboard() {
    const [bannerDismissed, setBannerDismissed] = useState(false);

    const { data: profile } = useProfile(); // ✅ اول تعریف شه

    const { data: dashboardData, isLoading: statsLoading } =
        useDashboardStats();
    const { data: recentData, isLoading: recentLoading } = useRecentInvoices(5);
    const { data: pendingData, isLoading: pendingLoading } =
        usePendingInvoices(5);

    const isLoading = statsLoading || recentLoading || pendingLoading;
    const isProfileIncomplete = profile && !profile.first_name; // ✅ یه بار
    const showBanner = isProfileIncomplete && !bannerDismissed;

    if (isLoading) return <LoadingSpinner />;

    return (
        <main className="text-right">
            {showBanner && (
                <div className="flex items-center justify-between gap-3 mb-4 px-4 py-3 rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-200">
                    <span>
                        پروفایل شما ناقص است.{" "}
                        <NavLink
                            to="/profile"
                            className="font-semibold underline"
                        >
                            همین الان کامل کنید
                        </NavLink>
                    </span>
                    <button onClick={() => setBannerDismissed(true)}>
                        <X className="w-4 h-4" />
                        <span className="sr-only">close</span>
                    </button>
                </div>
            )}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">داشبورد</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        {profile?.first_name
                            ? `خوش آمدید، ${profile.first_name} 👋`
                            : "خوش آمدید 👋"}
                    </p>
                </div>
                <SubscriptionStatusMini />
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
