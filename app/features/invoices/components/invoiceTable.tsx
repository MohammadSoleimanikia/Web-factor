// src/components/invoices/invoiceTable.tsx
import clsx from "clsx";
import { useState } from "react";
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
import { useDeleteInvoice } from "@/features/invoices/hooks/useDeleteInvoice";
import { useInvoices } from "@/features/invoices/hooks/useInvoices";
import { useMarkInvoiceAsPaid } from "@/features/invoices/hooks/useMarkInvoiceAsPaid";
import type { Invoice } from "@/features/invoices/types/invoicePreview.type";

import { Badge } from "../../../components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../../components/ui/pagination";
import InvoiceActions from "./invoiceActions";
import InvoiceSkeleton from "./invoiceSkeleton";

interface InvoiceTableProps {
    searchQuery: string;
    status: string;
}

export default function InvoiceTable({
    searchQuery,
    status,
}: InvoiceTableProps) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const pageSize = 10;

    // 📦 Fetch data - حالا با همه پارامترها
    const { invoices, count, isLoading, error, refetch } = useInvoices({
        page,
        pageSize,
        searchQuery,
        status,
    });

    // 🗑️ Mutations
    const { mutateAsync: deleteInvoice, isPending: isDeleting } =
        useDeleteInvoice();
    const { mutateAsync: markAsPaid, isPending: isPaying } =
        useMarkInvoiceAsPaid();

    const totalPages = Math.ceil(count / pageSize);

    // 🗑️ Handle Delete
    const handleDelete = async (
        id: string,
        invoiceStatus: string | undefined,
    ) => {
        if (invoiceStatus === "paid") {
            toast.error("فاکتور پرداخت شده را نمی‌توان حذف کرد");
            return;
        }

        try {
            await deleteInvoice({ id });
            toast.success("فاکتور با موفقیت حذف شد");
            await refetch();
        } catch (err) {
            console.log(err);
            toast.error("خطا در حذف فاکتور");
        }
    };

    // ✏️ Handle Edit
    const handleEdit = (id: string, invoiceStatus: string | undefined) => {
        if (invoiceStatus === "paid") {
            toast.error("فاکتور پرداخت شده را نمی‌توان ویرایش کرد");
            return;
        }
        navigate(`/invoices/edit/${id}`);
    };

    // 💰 Handle Mark as Paid
    const handlePaid = async (
        id: string,
        invoiceStatus: string | undefined,
    ) => {
        if (invoiceStatus === "paid") {
            toast.error("فاکتور از قبل پرداخت شده است");
            return;
        }

        try {
            await markAsPaid({ id });
            toast.success("فاکتور با موفقیت به پرداخت شده تغییر یافت");
            refetch();
        } catch (err) {
            console.log(err);
            toast.error("خطا در تغییر وضعیت فاکتور");
        }
    };

    if (isLoading) {
        return <InvoiceSkeleton />;
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <div className="text-red-500">خطا در بارگذاری فاکتورها</div>
                <button
                    onClick={() => refetch()}
                    className="mt-2 text-blue-500 hover:underline"
                >
                    تلاش مجدد
                </button>
            </div>
        );
    }

    return (
        <div className="my-5">
            <Table className="my-5">
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
                            <TableCell className="w-40 truncate">
                                <div className="w-45 truncate">
                                    {invoice.customer_address || "-"}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
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
                                    isDeleting={isDeleting}
                                    isPaying={isPaying}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {totalPages > 1 && (
                <Pagination className="mt-4" dir="rtl">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    page < totalPages && setPage(page + 1)
                                }
                                className={
                                    page === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages })
                            .reverse()
                            .map((_, i) => {
                                const pageNumber = totalPages - i;
                                return (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationLink
                                            isActive={page === pageNumber}
                                            onClick={() => setPage(pageNumber)}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}

                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => page > 1 && setPage(page - 1)}
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
    );
}
