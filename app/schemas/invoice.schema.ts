import { custom, z } from "zod";

// InvoiceItem schema
const InvoiceItemSchema = z.object({
    product_id: z
        .number()
        .int()
        .positive({ message: "محصول معتبر انتخاب شود" }),
    quantity: z.coerce
        .number()
        .int()
        .min(1, "تعداد باید حداقل 1 باشد")
        .max(9223372036854776000, "تعداد بسیار زیاد است"),
    price: z.string(),
});

// Main Invoice schema
export const InvoiceSchema = z.object({
    items: z
        .array(InvoiceItemSchema)
        .nonempty("حداقل یک آیتم الزامی است")
        .min(1, "حداقل یک آیتم الزامی است"),
    id: z.number().int().positive().optional(),
    customer_name: z
        .string()
        .min(2, "نام مشتری باید حداقل 2 کاراکتر باشد")
        .max(255, "نام مشتری نمی‌تواند بیشتر از 255 کاراکتر باشد"),
    customer_phone_number: z
        .string(),
    customer_email: z
        .string(),
    customer_address: z
        .string(),
    status: z.enum(["pending", "paid", "cancelled"], "وضعیت نامعتبر است"),
    payment_mode: z.enum(
        ["cash", "card", "bank", "others"],
        "روش پرداخت نامعتبر است"
    ),
});

export type InvoiceFormType = z.infer<typeof InvoiceSchema>;
