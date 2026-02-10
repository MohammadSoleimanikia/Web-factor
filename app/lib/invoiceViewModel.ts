// lib/invoiceViewModel.ts
import num2persian from "num2persian";

import { invoiceStatusFa, paymentModeFa } from "@/constants/invoice";
import type { Invoice } from "@/types/invoice";


type InvoiceViewModelProps = {
    invoice: Invoice;
};
export function buildInvoiceViewModel({ invoice }: InvoiceViewModelProps) {
    return {
        invoiceNumber: invoice.invoice_number,
        createdAt: invoice.created,
        is_public: invoice.is_public,
        public_token: invoice.public_token,
        customer: {
            name: invoice.customer_name,
            address: invoice.customer_address,
            phone: invoice.customer_phone_number,
            email: invoice.customer_email ?? "",
        },
        items: invoice.items.map((item) => {
            return {
                name: item.product.name,
                quantity: item.quantity,
                unitPrice: item.price,
                total: Number(item.price) * item.quantity,
            };
        }),
        total: invoice.total_amount,
        totalText: num2persian(invoice.total_amount),
        statusText: invoice.status ? invoiceStatusFa[invoice.status] : "نامشخص",
        paymentText: invoice.payment_mode
            ? paymentModeFa[invoice.payment_mode]
            : "نامشخص",
    };
}
