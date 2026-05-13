import type { PaginatedInvoiceList } from "@/features/invoices/types/invoicePreview.type";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

import { InvoiceTableRows } from "./invoiceTableRows";

export default function RecentInvoicesTable({
    recentData,
}: {
    recentData?: PaginatedInvoiceList;
}) {
    return (
        <section className="rounded-xl border bg-card p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-3">چند فاکتور اخیر</h2>
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
                        emptyMessage="فاکتوری ثبت نشده است"
                        invoices={recentData?.results ?? []}
                    />
                </TableBody>
            </Table>
        </section>
    );
}
