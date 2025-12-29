import { useEffect, useState } from "react";
import InvoiceSkeleton from "./invoiceSkeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Invoice } from "@/types/invoice";
import { apiFetch } from "@/lib/api";
import { Button } from "../ui/button";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { Link } from "react-router";

export default function InvoiceTable() {
    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [count, setCount] = useState(0);
    const totalPages = Math.ceil(count / pageSize);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);

            try {
                const data = await apiFetch(
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
                                        {invoice.status || "-"}
                                    </TableCell>
                                    <TableCell>
                                        {invoice.payment_mode || "-"}
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
                                    <TableCell>
                                        <Link to={`/invoices/${invoice.id}`}>
                                            <Button variant="outline">
                                                مشاهده
                                            </Button>
                                        </Link>
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
