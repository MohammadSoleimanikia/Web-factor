// app/routes/purchaseInvoices.tsx
import { Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import { CancelPurchaseInvoiceButton } from "@/features/purchase-invoices/components/CancelPurchaseInvoiceButton";
import { CompletePurchaseInvoiceButton } from "@/features/purchase-invoices/components/CompletePurchaseInvoiceButton";
import { PurchaseInvoiceStatusBadge } from "@/features/purchase-invoices/components/PurchaseInvoiceStatusBadge";
import { usePurchaseInvoices } from "@/features/purchase-invoices/hooks/usePurchaseInvoices";
import type { PurchaseInvoice } from "@/features/purchase-invoices/types/purchaseInvoice.types";
import { Badge } from "@/features/shared/components/ui/badge";
import { Button } from "@/features/shared/components/ui/button";
import { Card } from "@/features/shared/components/ui/card";
import { Input } from "@/features/shared/components/ui/input";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/features/shared/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

function formatCurrency(value?: number | null) {
    return Number(value ?? 0).toLocaleString("fa-IR");
}

function formatDate(date?: string | null) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function PurchaseInvoices() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);

    const { data, isLoading, error, refetch } = usePurchaseInvoices({
        page,
        pageSize: 20,
        search,
        status,
    });

    if (isLoading) return <LoadingSpinner />;

    if (error) {
        return (
            <div className="space-y-4 py-10 text-center">
                <p className="text-red-500">خطا در دریافت فاکتورهای خرید</p>

                <Button variant="outline" onClick={() => refetch()}>
                    تلاش مجدد
                </Button>
            </div>
        );
    }

    const invoices = data?.results ?? [];
    const totalPages = Math.ceil((data?.count ?? 0) / 20);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">فاکتورهای خرید</h1>
                    <p className="text-muted-foreground text-sm">
                        مدیریت خرید از تأمین‌کنندگان
                    </p>
                </div>

                <Link to="/purchase-invoices/new">
                    <Button>
                        <Plus className="h-4 w-4 ml-2" />
                        فاکتور خرید جدید
                    </Button>
                </Link>
            </div>

            <Card className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative flex-1 min-w-[220px]">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                        <Input
                            placeholder="جستجوی تأمین‌کننده..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="pr-9"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setPage(1);
                                }}
                                className="absolute left-3 top-1/2 -translate-y-1/2"
                            >
                                <span className="sr-only">پاک کردن جستجو</span>
                                <X className="h-4 w-4 text-muted-foreground" />
                            </button>
                        )}
                    </div>

                    <Select
                        value={status}
                        onValueChange={(value) => {
                            setStatus(value);
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="وضعیت" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">همه</SelectItem>
                            <SelectItem value="pending">در انتظار</SelectItem>
                            <SelectItem value="completed">
                                تکمیل شده
                            </SelectItem>
                            <SelectItem value="cancelled">لغو شده</SelectItem>
                        </SelectContent>
                    </Select>

                    <Badge variant="outline">{data?.count ?? 0} فاکتور</Badge>
                </div>
            </Card>

            <Card>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">
                                    شماره فاکتور
                                </TableHead>
                                <TableHead className="text-right">
                                    تأمین‌کننده
                                </TableHead>
                                <TableHead className="text-right">
                                    تلفن
                                </TableHead>
                                <TableHead className="text-right">
                                    مبلغ کل
                                </TableHead>
                                <TableHead className="text-right">
                                    وضعیت
                                </TableHead>
                                <TableHead className="text-right">
                                    تاریخ خرید
                                </TableHead>
                                <TableHead className="text-left">
                                    عملیات
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {invoices.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center text-muted-foreground py-10"
                                    >
                                        فاکتور خریدی یافت نشد.
                                    </TableCell>
                                </TableRow>
                            )}

                            {invoices.map((invoice: PurchaseInvoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">
                                        {invoice.invoice_number || "-"}
                                    </TableCell>

                                    <TableCell>
                                        {invoice.supplier_name || "-"}
                                    </TableCell>

                                    <TableCell>
                                        {invoice.supplier_phone || "-"}
                                    </TableCell>

                                    <TableCell className="font-medium">
                                        {formatCurrency(invoice.total_amount)}{" "}
                                        تومان
                                    </TableCell>

                                    <TableCell>
                                        <PurchaseInvoiceStatusBadge
                                            status={invoice.status}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        {formatDate(invoice.purchased_time)}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/purchase-invoices/${invoice.id}`}
                                            >
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    مشاهده
                                                </Button>
                                            </Link>

                                            {invoice.status === "pending" && (
                                                <Link
                                                    to={`/purchase-invoices/edit/${invoice.id}`}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                    >
                                                        ویرایش
                                                    </Button>
                                                </Link>
                                            )}

                                            {invoice.status === "pending" && (
                                                <>
                                                    <CompletePurchaseInvoiceButton
                                                        id={invoice.id}
                                                    />

                                                    <CancelPurchaseInvoiceButton
                                                        id={invoice.id}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page <= 1}
                        onClick={() => setPage((current) => current - 1)}
                    >
                        قبلی
                    </Button>

                    <span className="text-sm text-muted-foreground">
                        صفحه {page} از {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages}
                        onClick={() => setPage((current) => current + 1)}
                    >
                        بعدی
                    </Button>
                </div>
            )}
        </div>
    );
}