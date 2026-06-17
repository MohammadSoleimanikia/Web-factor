// routes/dashboard/dashboard.tsx
import { FileText, Package, Users } from "lucide-react";
import { Link } from "react-router";

import PendingInvoicesTable from "@/features/dashboard/components/pendingInvoicesTable";
import RecentInvoicesTable from "@/features/dashboard/components/recentInvoicesTable";
import StatsCards from "@/features/dashboard/components/statsCards";
import { TopProductsChart } from "@/features/dashboard/components/topProductChart";
import { TrendChart } from "@/features/dashboard/components/trendChart";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { usePendingInvoices } from "@/features/dashboard/hooks/usePendingInvoices";
import { useRecentInvoices } from "@/features/dashboard/hooks/useRecentInvoices";
import { Alert, AlertDescription } from "@/features/shared/components/ui/alert";
import { Button } from "@/features/shared/components/ui/button";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";
import { useHasActiveSubscription } from "@/features/subscription/hooks/useSubscription";
import useAuth from "@/store/auth";

export default function Dashboard() {
    const { data: dashboardData, isLoading: statsLoading } =
        useDashboardStats();
    const { data: recentData, isLoading: recentLoading } = useRecentInvoices(5);
    const { data: pendingData, isLoading: pendingLoading } =
        usePendingInvoices(5);
    const { hasAccess } = useHasActiveSubscription();
    const profile = useAuth((state) => state.profile);

    const isLoading = statsLoading || recentLoading || pendingLoading;

    if (isLoading) return <LoadingSpinner />;
    const isProfileComplete = () => {
        const requiredFields = [
            profile?.first_name,
            profile?.last_name,
            profile?.phone_number,
            profile?.profile?.store_name,
        ];
        return requiredFields.every((field) => field && field.trim() !== "");
    };

    // نام کاربر برای خوش‌آمدگویی
    const fullName =
        [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
        "کاربر";
    const storeName = profile?.profile?.store_name;

    return (
        <main className="text-right">
            {/* خوش‌آمدگویی با نام کاربر */}
            <div className="mb-2">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    خوش آمدی، {fullName} عزیز!
                </h1>
                {storeName && (
                    <p className="text-xl text-muted-foreground mt-1 flex items-center gap-1">
                        {storeName}
                    </p>
                )}
            </div>
            {!isProfileComplete() && (
                <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
                    <AlertDescription className= " flex items-center text-yellow-800 dark:text-yellow-300">
                        ⚠️ پروفایل شما ناقص است. لطفاً اطلاعات خود را تکمیل
                        کنید.
                        <Link to="/profile">
                            <Button
                                variant="ghost"
                                size="lg"
                            >
                                تکمیل پروفایل
                            </Button>
                        </Link>
                    </AlertDescription>
                </Alert>
            )}
            {/* CTA Buttons - برای کاربران دارای اشتراک */}
            {hasAccess && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 mt-6">
                    <Link to="/invoices/new">
                        <Button className="w-full gap-2" size="lg">
                            <FileText className="w-4 h-4" />
                            فاکتور جدید
                        </Button>
                    </Link>
                    <Link to="/products">
                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            size="lg"
                        >
                            <Package className="w-4 h-4" />
                            ثبت کالا
                        </Button>
                    </Link>
                    <Link to="/customers">
                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            size="lg"
                        >
                            <Users className="w-4 h-4" />
                            ثبت مشتری
                        </Button>
                    </Link>
                </div>
            )}

            {/* پیام برای کاربران بدون اشتراک */}
            {!hasAccess && (
                <div className="bg-muted rounded-lg p-4 mb-8 mt-6 text-center">
                    <p className="text-muted-foreground mb-2">
                        برای استفاده از امکانات وب‌فاکتور، ابتدا اشتراک تهیه
                        کنید.
                    </p>
                    <Link to="/subscription">
                        <Button variant="default" size="sm">
                            مشاهده تعرفه‌ها
                        </Button>
                    </Link>
                </div>
            )}

            {/* کارت‌های آماری */}
            <StatsCards dashboardData={dashboardData} />

            {/* جداول */}
            <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
                <RecentInvoicesTable recentData={recentData} />
                <PendingInvoicesTable pendingData={pendingData} />
            </div>

            {/* نمودارها */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4">
                {dashboardData?.trends && (
                    <TrendChart chartData={dashboardData.trends} />
                )}
                {dashboardData?.top_products && (
                    <TopProductsChart chartData={dashboardData.top_products} />
                )}
            </div>
        </main>
    );
}
