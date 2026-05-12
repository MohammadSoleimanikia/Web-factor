import clsx from "clsx";
import { CircleDollarSign, Clock, Scroll } from "lucide-react";
import { useEffect, useState } from "react";

import InvoiceStatCard from "@/features/dashboard/components/InvoiceStatCard";
import { TopProductsChart } from "@/features/dashboard/components/topProductChart";
import { TrendChart } from "@/features/dashboard/components/trendChart";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { invoiceStatusFa } from "@/features/invoices/constants/invoice";
import type {
    Invoice,
    PaginatedInvoiceList,
} from "@/features/invoices/types/invoicePreview.type";
import { apiFetch } from "@/lib/api";
import type { DashboardData } from "@/features/dashboard/types/dashboard.type";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
    const [pendingInvoices, setPendingInvoices] = useState<Invoice[]>([]);

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
                const [dashboardData, recentData, pendingData] =
                    await Promise.all([
                        apiFetch<DashboardData>("/user/dashboard/"),
                        apiFetch<PaginatedInvoiceList>(
                            "/user/invoices/?page=1&page_size=5",
                        ),
                        apiFetch<PaginatedInvoiceList>(
                            "/user/invoices/?page=1&page_size=5&status=pending",
                        ),
                    ]);

                setDashboardData(dashboardData);
                setRecentInvoices(recentData.results);
                setPendingInvoices(pendingData.results);
            } catch (err) {
                console.error("error fetching dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const renderInvoiceRows = (invoices: Invoice[], emptyMessage: string) => {
        if (!invoices.length) {
            return (
                <TableRow>
                    <TableCell
                        colSpan={4}
                        className="text-center text-muted-foreground"
                    >
                        {emptyMessage}
                    </TableCell>
                </TableRow>
            );
        }

        return invoices.map((invoice) => (
            <TableRow key={invoice.id}>
                <TableCell>{invoice.customer_name || "-"}</TableCell>
                <TableCell>{invoice.total_amount} تومان</TableCell>
                <TableCell>
                    {invoice.status ? (
                        <Badge
                            className={clsx("bg-slate-600", {
                                "bg-green-100 text-green-900":
                                    invoice.status === "paid",
                                "bg-yellow-100 text-yellow-900":
                                    invoice.status === "pending",
                            })}
                        >
                            {invoiceStatusFa[invoice.status]}
                        </Badge>
                    ) : (
                        "-"
                    )}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                    {invoice.created}
                </TableCell>
            </TableRow>
        ));
    };
    if (loading) return <LoadingSpinner />;
    return (
        <main className="text-right">
            <h1 className="text-2xl font-bold mb-4">داشبورد</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 💰 فروش کل */}
                <InvoiceStatCard
                    title="فروش کل"
                    value={dashboardData.total_revenue}
                    unit="تومان"
                    icon={CircleDollarSign}
                    showPersianText
                    className="border-l-4 border-teal-500 text-teal-600"
                />

                {/* 📄 تعداد کل فاکتورها */}
                <InvoiceStatCard
                    title="تعداد کل فاکتورها"
                    value={dashboardData.total_invoice}
                    unit="عدد"
                    icon={Scroll}
                    className="border-l-4 border-slate-400 text-slate-600"
                />

                {/* ⏳ فاکتورهای در انتظار */}
                <InvoiceStatCard
                    title="تعداد فاکتورهای در انتظار"
                    value={dashboardData.pending_count}
                    unit="عدد"
                    icon={Clock}
                    className="border-l-4 border-amber-400 text-amber-600"
                />

                {/* 💸 در انتظار پرداخت */}
                <InvoiceStatCard
                    title="در انتظار پرداخت"
                    value={dashboardData.outstanding_amount}
                    unit="تومان"
                    icon={CircleDollarSign}
                    showPersianText
                    className="border-l-4 border-sky-400 text-sky-600"
                />
            </div>

            <div className="mt-5 grid grid-cols-1 xl:grid-cols-2 gap-4">
                <section className="rounded-xl border bg-card p-4 shadow-sm">
                    <h2 className="text-lg font-semibold mb-3">
                        چند فاکتور اخیر
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>نام مشتری</TableHead>
                                <TableHead>مبلغ</TableHead>
                                <TableHead>وضعیت</TableHead>
                                <TableHead>تاریخ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {renderInvoiceRows(
                                recentInvoices,
                                "فاکتوری ثبت نشده است",
                            )}
                        </TableBody>
                    </Table>
                </section>

                <section className="rounded-xl border bg-card p-4 shadow-sm">
                    <h2 className="text-lg font-semibold mb-3">
                        فاکتورهای در حال انتظار
                    </h2>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>نام مشتری</TableHead>
                                <TableHead>مبلغ</TableHead>
                                <TableHead>وضعیت</TableHead>
                                <TableHead>تاریخ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {renderInvoiceRows(
                                pendingInvoices,
                                "فاکتور در انتظار پرداخت موجود نیست",
                            )}
                        </TableBody>
                    </Table>
                </section>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 auto-rows-fr gap-4">
                <TrendChart chartData={dashboardData.trends} />
                <TopProductsChart chartData={dashboardData.top_products} />
            </div>
        </main>
    );
}
