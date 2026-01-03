import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { invoiceStatusFa, paymentModeFa } from "@/constants/invoice";
import { apiFetch } from "@/lib/api";
import type { Invoice, PaginatedInvoiceList } from "@/types/invoice";

import { Button } from "../ui/button";
import DeleteConfirm from "../ui/deleteConfirm";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import InvoiceSkeleton from "./invoiceSkeleton";

export default function InvoiceTable() {
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
                const data = await apiFetch<PaginatedInvoiceList>(
                    `/user/invoices/?page=${page}&page_size=${pageSize}`
                );
                setInvoices(data.results);
                setCount(data.count);
            } catch (err) {
                console.log(err);
            }

            setLoading(false);
        };

        fetchInvoices();
    }, [page]);

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
    return (
        <>
            {loading ? (
                <InvoiceSkeleton />
            ) : (
                <div className="my-5 ">
                    <Table className="my-5">
                        <TableHeader className="bg-muted rounded-sm">
                            <TableRow>
                                <TableHead>نام مشتری</TableHead>
                                <TableHead>ایمیل مشتری</TableHead>
                                <TableHead>شماره تلفن</TableHead>
                                <TableHead>آدرس</TableHead>
                                <TableHead>وضعیت</TableHead>
                                <TableHead>روش پرداخت</TableHead>
                                <TableHead>مبلغ کل</TableHead>
                                <TableHead>تعداد آیتم‌ها</TableHead>
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
                                        {invoice.customer_email || "-"}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.customer_phone_number || "-"}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.customer_address || "-"}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.status
                                            ? invoiceStatusFa[invoice.status]
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.payment_mode
                                            ? paymentModeFa[
                                                invoice.payment_mode
                                            ]
                                            : "-"}
                                    </TableCell>
                                    <TableCell className="flex items-center gap-2">
                                        <span>{invoice.total_amount}</span>
                                        <span>تومان</span>
                                    </TableCell>
                                    <TableCell>
                                        {invoice.items?.length || 0}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(
                                            invoice.created
                                        ).toLocaleDateString("fa-IR")}
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Link to={`/invoices/${invoice.id}`}>
                                            <Button variant="outline">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        {/* <Link
                                            to={`/invoices/edit/${invoice.id}`}
                                        >
                                            <Button variant="outline">
                                                <SquarePen className="w-4 h-4" /> 
                                            </Button>
                                        </Link> */}
                                        <DeleteConfirm
                                            title={"فاکتور"}
                                            onConfirm={() =>
                                                handleDelete(
                                                    invoice.id,
                                                    invoice.status
                                                )
                                            }
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
