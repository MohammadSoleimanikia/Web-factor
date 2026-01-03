import { useEffect, useState } from "react";

import LoadingSpinner from "@/components/ui/loadingSpinner";
import { apiFetch } from "@/lib/api";
import useAuth from "@/store/auth";
import type { DashboardData } from "@/types/dashboardData";
import type { User } from "@/types/user";

export default function Dashboard() {
    const { setProfile } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfileState] = useState<User | null>(null);

    const [dashboardData, setDashboardData] = useState<DashboardData>({
        total_revenue: 0,
        outstanding_amount: 0,
        pending_count: 0,
        trends: [
            {
                month: "2025-12-31T06:50:15.300Z",
                total: 0,
            },
        ],
        top_products: [
            {
                product__name: "string",
                revenue: 0,
            },
        ],
    });

    useEffect(() => {
        const init = async () => {
            try {
                const [profileData, dashboardData] = await Promise.all([
                    apiFetch<User>("/account/profile/"),
                    apiFetch<DashboardData>("/user/dashboard/"),
                ]);

                setProfileState(profileData);
                setDashboardData(dashboardData);

                setProfile(profileData);
            } catch (err) {
                console.error("error fetching dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [setProfile]);

    if (loading) return <LoadingSpinner />;
    if (!profile) return <p>پروفایل پیدا نشد</p>;

    return (
        <div className="text-right">
            <h1 className="text-2xl font-bold mb-4">داشبورد</h1>
            <p className="mb-2">خوش آمدید، {profile.first_name}!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg">
                    <h2 className="font-semibold">درآمد کل</h2>
                    <p>{dashboardData.total_revenue}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <h2 className="font-semibold">مقدار فاکتور های در حال انتظار</h2>
                    <p>{dashboardData.outstanding_amount}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <h2 className="font-semibold">فاکتورهای در انتظار</h2>
                    <p>{dashboardData.pending_count}</p>
                </div>
                {dashboardData.trends.length > 0 && (
                    <div>
                        <div className="bg-muted p-4 rounded-lg md:col-span-2">
                            <h2 className="font-semibold mb-2">روند فروش</h2>
                        </div>
                        {dashboardData.trends.map((trend) => (
                            <div key={trend.month}>
                                <p>{trend.month}</p>
                                <p>{trend.total}</p>
                            </div>
                        ))}
                    </div>
                )}

                {dashboardData.top_products.length > 0 && (
                    <div>
                        <div className="bg-muted p-4 rounded-lg md:col-span-1">
                            <h2 className="font-semibold mb-2">محصولات برتر</h2>
                        </div>
                        {dashboardData.top_products.map((product) => (
                            <div key={product.product__name}>
                                <p>{product.product__name}</p>
                                <p>{product.revenue}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
