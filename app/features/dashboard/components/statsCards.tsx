import { CircleDollarSign, Clock, Scroll } from "lucide-react";

import type { DashboardData } from "../types/dashboard.type";
import InvoiceStatCard from "./InvoiceStatCard";

export default function StatsCards({
    dashboardData,
}: {
    dashboardData?: DashboardData;
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 💰 فروش کل */}
            <InvoiceStatCard
                title="فروش کل"
                value={dashboardData?.total_revenue || 0}
                unit="تومان"
                icon={CircleDollarSign}
                showPersianText
                className="border-l-4 border-teal-500 text-teal-600 dark:border-teal-400 dark:text-teal-400"
            />

            {/* 📄 تعداد کل فاکتورها */}
            <InvoiceStatCard
                title="تعداد کل فاکتورها"
                value={dashboardData?.total_invoice || 0}
                unit="عدد"
                icon={Scroll}
                className="border-l-4 border-slate-400 text-slate-600 dark:border-slate-300 dark:text-slate-300"
            />

            {/* ⏳ فاکتورهای در انتظار */}
            <InvoiceStatCard
                title="تعداد فاکتورهای در انتظار"
                value={dashboardData?.pending_count || 0}
                unit="عدد"
                icon={Clock}
                className="border-l-4 border-amber-400 text-amber-600 dark:border-amber-400 dark:text-amber-400"
            />

            {/* 💸 در انتظار پرداخت */}
            <InvoiceStatCard
                title="در انتظار پرداخت"
                value={dashboardData?.outstanding_amount || 0}
                unit="تومان"
                icon={CircleDollarSign}
                showPersianText
                className="border-l-4 border-sky-400 text-sky-600 dark:border-sky-400 dark:text-sky-400"
            />
        </div>
    );
}
