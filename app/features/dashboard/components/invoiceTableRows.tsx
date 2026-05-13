// InvoiceTableRows.tsx
import clsx from "clsx";

import { invoiceStatusFa } from "@/features/invoices/constants/invoice";
import type { Invoice } from "@/features/invoices/types/invoicePreview.type";
import { Badge } from "@/features/shared/components/ui/badge";
import { TableCell, TableRow } from "@/features/shared/components/ui/table";

interface InvoiceTableRowsProps {
    invoices: Invoice[];
    emptyMessage: string;
}

export function InvoiceTableRows({
    invoices,
    emptyMessage,
}: InvoiceTableRowsProps) {
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
            <TableCell>{invoice.total_amount.toLocaleString()} تومان</TableCell>
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
}
