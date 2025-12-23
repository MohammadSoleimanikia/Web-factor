// lib/invoiceViewModel.ts
import num2persian from "num2persian";
import { invoiceStatusFa, paymentModeFa } from "@/constants/invoice";
import type { Invoice } from "@/types/invoice";
import type { Product } from "@/types/product";
import { toJalali } from "./jalali";

type InvoiceViewModelProps ={
    invoice:Invoice;
    products: Product[];
}
export function buildInvoiceViewModel({invoice, products}: InvoiceViewModelProps) {
    return {
        invoiceNumber: invoice.invoice_number,
        createdAt: toJalali(invoice.created),
        customer: {
            name: invoice.customer_name,
            address: invoice.customer_address,
            phone: invoice.customer_phone_number,
            email:invoice.customer_email ??'',
        },
        items: invoice.items.map((item) => {
            const product = products.find((p) => p.id === item.product);
            return {
                name: product?.name ?? "نامشخص",
                quantity: item.quantity,
                unitPrice: item.price,
                total:Number(item.price) * item.quantity,
            };
        }),
        total: invoice.total_amount,
        totalText: num2persian(invoice.total_amount),
        statusText: invoice.status ? invoiceStatusFa[invoice.status] : "نامشخص",
        paymentText: invoice.payment_mode ? paymentModeFa[invoice.payment_mode] : "نامشخص",
    };
}
