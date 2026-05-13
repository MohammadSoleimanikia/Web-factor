import React from "react";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { PaginatedInvoiceList } from "@/features/invoices/types/invoicePreview.type";

import { InvoiceTableRows } from "./invoiceTableRows";

export default function PendingInvoicesTable({
    pendingData,
}: {
    pendingData?: PaginatedInvoiceList;
}) {
    return (
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
                    <InvoiceTableRows
                        emptyMessage="فاکتور در انتظار پرداخت موجود نیست"
                        invoices={pendingData?.results ?? []}
                    />
                </TableBody>
            </Table>
        </section>
    );
}
