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
                className="border-l-4 border-teal-500 text-teal-600"
            />

            {/* 📄 تعداد کل فاکتورها */}
            <InvoiceStatCard
                title="تعداد کل فاکتورها"
                value={dashboardData?.total_invoice || 0}
                unit="عدد"
                icon={Scroll}
                className="border-l-4 border-slate-400 text-slate-600"
            />

            {/* ⏳ فاکتورهای در انتظار */}
            <InvoiceStatCard
                title="تعداد فاکتورهای در انتظار"
                value={dashboardData?.pending_count || 0}
                unit="عدد"
                icon={Clock}
                className="border-l-4 border-amber-400 text-amber-600"
            />

            {/* 💸 در انتظار پرداخت */}
            <InvoiceStatCard
                title="در انتظار پرداخت"
                value={dashboardData?.outstanding_amount || 0}
                unit="تومان"
                icon={CircleDollarSign}
                showPersianText
                className="border-l-4 border-sky-400 text-sky-600"
            />
        </div>
    );
}
