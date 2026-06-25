// app/features/purchase-invoices/schema/purchaseInvoice.schema.ts
import { z } from "zod";

import type { PurchaseInvoiceCreate } from "../types/purchaseInvoice.types";

export const PurchaseInvoiceSchema = z.object({
    supplier_name: z.string().optional(),
    supplier_phone: z.string().optional(),

    supplier_email: z
        .string()
        .email("ایمیل معتبر نیست")
        .optional()
        .or(z.literal("")),

    supplier_address: z.string().optional(),
    invoice_number: z.string().optional(),

    items: z
        .array(
            z.object({
                product_id: z.number().min(1, "محصول را انتخاب کنید"),
                quantity: z.number().min(1, "تعداد باید حداقل ۱ باشد"),
                unit_cost: z.number().min(0, "قیمت خرید نمی‌تواند منفی باشد"),
            }),
        )
        .min(1, "حداقل یک کالا باید اضافه شود"),

    status: z.enum(["pending", "completed", "cancelled"]),
    discount: z.number().min(0, "تخفیف نمی‌تواند منفی باشد"),
    added_value: z.number().min(0, "ارزش افزوده نمی‌تواند منفی باشد"),

    purchased_time: z.string().min(1, "تاریخ خرید الزامی است"),
});

export type PurchaseInvoiceFormType = z.infer<typeof PurchaseInvoiceSchema>;

function emptyStringToNull(value?: string | null) {
    const trimmed = value?.trim();
    return trimmed ? trimmed : null;
}

function dateInputToIso(value: string) {
    const [year, month, day] = value.split("-").map(Number);

    if (!year || !month || !day) {
        return new Date(value).toISOString();
    }

    return new Date(year, month - 1, day).toISOString();
}

export function normalizePurchaseInvoicePayload(
    data: PurchaseInvoiceFormType,
): PurchaseInvoiceCreate {
    return {
        supplier_name: emptyStringToNull(data.supplier_name),
        supplier_phone: emptyStringToNull(data.supplier_phone),
        supplier_email: emptyStringToNull(data.supplier_email),
        supplier_address: emptyStringToNull(data.supplier_address),
        invoice_number: emptyStringToNull(data.invoice_number),

        items: data.items.map((item) => ({
            product_id: Number(item.product_id),
            quantity: Number(item.quantity),
            unit_cost: Number(item.unit_cost),
        })),

        status: data.status,
        discount: Number(data.discount ?? 0),
        added_value: Number(data.added_value ?? 0),
        purchased_time: dateInputToIso(data.purchased_time),
    };
}
