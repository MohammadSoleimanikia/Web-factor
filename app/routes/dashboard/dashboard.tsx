import { useEffect, useState } from "react";

import InvoiceAmount from "@/components/dashboard/invoiceAmount";
import InvoiceNumber from "@/components/dashboard/invoiceNumber";
import { TopProductsChart } from "@/components/dashboard/topProductChart";
import { TrendChart } from "@/components/dashboard/trendChart";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { apiFetch } from "@/lib/api";
import useAuth from "@/store/auth";
import type { DashboardData } from "@/types/dashboardData";

export default function Dashboard() {
    const { setProfile } = useAuth();
    const [loading, setLoading] = useState(true);

    const [dashboardData, setDashboardData] = useState<DashboardData>({
        total_invoice: 0,
        total_revenue: 0,
        outstanding_amount: 0,
        pending_count: 0,
        trends: [
            {
                date: "2025-12-31T06:50:15.300Z",
                total: 0,
            },
        ],
        top_products: [
            {
                product__name: "string",
                quantity: 0,
            },
        ],
    });

    useEffect(() => {
        const init = async () => {
            try {
                const dashboardData =
                    await apiFetch<DashboardData>("/user/dashboard/");

                setDashboardData(dashboardData);
            } catch (err) {
                console.error("error fetching dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [setProfile]);

    if (loading) return <LoadingSpinner />;

    return (
        <main className="text-right">
            <h1 className="text-2xl font-bold mb-4">داشبورد</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <InvoiceAmount
                    title="درآمد کل"
                    value={dashboardData.total_revenue}
                />
                <InvoiceNumber
                    title="تعداد کل فاکتور ها"
                    value={dashboardData.total_invoice}
                />

                <InvoiceNumber
                    title="تعداد فاکتور های در انتظار"
                    value={dashboardData.pending_count}
                />
                <InvoiceAmount
                    title="در انتظار پرداخت"
                    value={dashboardData.outstanding_amount}
                />
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <TrendChart chartData={dashboardData.trends} />
                <TopProductsChart chartData={dashboardData.top_products} />
            </div>
        </main>
    );
}
