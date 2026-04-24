import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { invoiceStatusFa } from "@/constants/invoice";
import { apiFetch } from "@/lib/api";
import { useCacheStore } from "@/store/cacheStore";
import type { Invoice, PaginatedInvoiceList } from "@/types/invoice";

import { Badge } from "../ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import InvoiceActions from "./invoiceActions";
import InvoiceSkeleton from "./invoiceSkeleton";
export default function InvoiceTable({
    reload,
    searchQuery,
    status,
}: {
    reload: number;
    searchQuery: string;
    status: string;
}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [invoices, setInvoices] = useState<Invoice[]>([]);

    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [count, setCount] = useState(0);
    const totalPages = Math.ceil(count / pageSize);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);

            try {
                const params = new URLSearchParams({
                    page: String(page),
                    page_size: String(pageSize),
                });

                if (searchQuery) {
                    params.append("customer_name", searchQuery);
                }

                if (status && status !== "all") {
                    params.append("status", status);
                }

                const data = await apiFetch<PaginatedInvoiceList>(
                    `/user/invoices/?${params.toString()}`,
                );

                setInvoices(data.results);
                setCount(data.count);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [reload, page, searchQuery, status]);

    const handleDelete = async (id: string, status: string | undefined) => {
        if (status === "paid") {
            toast.error("فاکتور پرداخت شده را نمی‌توان حذف کرد");
            return;
        }
        try {
            await apiFetch(`/user/invoices/${id}/`, { method: "DELETE" });
            setInvoices(invoices.filter((inv: Invoice) => inv.id !== id));

            toast.success("فاکتور با موفقیت حذف شد");
        } catch (err) {
            console.log(err);
            toast.error("خطا در حذف فاکتور");
        }
    };
    const handleEdit = async (id: string, status: string | undefined) => {
        if (status === "paid") {
            toast.error("فاکتور پرداخت شده را نمی‌توان ویرایش کرد");
            return;
        }
        navigate(`/invoices/edit/${id}`);
    };

    const handlePaid = async (id: string, status: string | undefined) => {
        if (status === "paid") {
            toast.error("فاکتور از قبل پرداخت شده است");
            return;
        }
        try {
            // First, make the API call to mark as paid
            await apiFetch(`/user/invoices/${id}/paid/`, { method: "POST" });

            // Invalidate all invoice-related cache variations
            const cacheStore = useCacheStore.getState();
            cacheStore.invalidateCacheByPrefix("/user/invoices/");

            // Refetch fresh data with CURRENT filter (status filter selected)
            const params = new URLSearchParams({
                page: String(page),
                page_size: String(pageSize),
            });

            if (searchQuery) {
                params.append("customer_name", searchQuery);
            }

            const freshData = await apiFetch<PaginatedInvoiceList>(
                `/user/invoices/?${params.toString()}`,
            );

            setInvoices(freshData.results);
            setCount(freshData.count);

            toast.success("فاکتور با موفقیت به پرداخت شده تغییر یافت");
        } catch (err) {
            console.log(err);
            toast.error("خطا در تغییر وضعیت فاکتور");
        }
    };
    return (
        <>
            {loading ? (
                <InvoiceSkeleton />
            ) : (
                <div className="my-5 ">
                    <Table className="my-5 ">
                        <TableHeader className="bg-muted rounded-sm">
                            <TableRow>
                                <TableHead>نام مشتری</TableHead>
                                <TableHead>شماره تلفن</TableHead>
                                <TableHead>آدرس</TableHead>
                                <TableHead>وضعیت</TableHead>
                                <TableHead>مبلغ کل</TableHead>
                                <TableHead>تاریخ ایجاد</TableHead>
                                <TableHead>عملیات</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {invoices?.map((invoice: Invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>
                                        {invoice.customer_name || "-"}
                                    </TableCell>

                                    <TableCell>
                                        {invoice.customer_phone_number || "-"}
                                    </TableCell>
                                    <TableCell className=" w-40 truncate">
                                        <div className="w-45 truncate">
                                            {invoice.customer_address || "-"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {invoice.status ? (
                                            <Badge
                                                className={clsx(
                                                    "bg-slate-600", 
                                                    {
                                                        "bg-green-100 text-green-900":
                                                            invoice.status ===
                                                            "paid",
                                                        "bg-yellow-100 text-yellow-900":
                                                            invoice.status ===
                                                            "pending",
                                                    },
                                                )}
                                            >
                                                {
                                                    invoiceStatusFa[
                                                        invoice.status
                                                    ]
                                                }
                                            </Badge>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right whitespace-nowrap">
                                        {invoice.total_amount} تومان
                                    </TableCell>

                                    <TableCell>{invoice.created}</TableCell>
                                    <TableCell>
                                        <InvoiceActions
                                            invoiceId={invoice.id}
                                            invoiceToken={invoice.public_token}
                                            invoiceStatus={invoice.status}
                                            handleDelete={handleDelete}
                                            handleEdit={handleEdit}
                                            handlePaid={handlePaid}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {totalPages > 1 && (
                        <Pagination className="mt-4" dir="rtl">
                            <PaginationContent>
                                {/* Next (on right in RTL) */}
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() =>
                                            page < totalPages &&
                                            setPage(page + 1)
                                        }
                                        className={
                                            page === totalPages
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                        }
                                    />
                                </PaginationItem>

                                {/* Page numbers reversed for RTL */}
                                {Array.from({ length: totalPages })
                                    .reverse()
                                    .map((_, i) => {
                                        const pageNumber = totalPages - i;

                                        return (
                                            <PaginationItem key={pageNumber}>
                                                <PaginationLink
                                                    isActive={
                                                        page === pageNumber
                                                    }
                                                    onClick={() =>
                                                        setPage(pageNumber)
                                                    }
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                {/* Previous (on left in RTL) */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() =>
                                            page > 1 && setPage(page - 1)
                                        }
                                        className={
                                            page === 1
                                                ? "pointer-events-none opacity-50"
                                                : ""
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            )}
        </>
    );
}
