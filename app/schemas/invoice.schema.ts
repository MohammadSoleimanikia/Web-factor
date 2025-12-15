import { z } from "zod";

// InvoiceItem schema
const InvoiceItemSchema = z.object({
    product: z.number().int().positive({ message: "محصول معتبر انتخاب شود" }),
    quantity: z.coerce
        .number()
        .int()
        .min(1, "تعداد باید حداقل 1 باشد")
        .max(9223372036854776000, "تعداد بسیار زیاد است"),
    price: z
        .string()
});

// Main Invoice schema
export const InvoiceSchema = z.object({
    items: z
        .array(InvoiceItemSchema)
        .nonempty("حداقل یک آیتم الزامی است")
        .min(1, "حداقل یک آیتم الزامی است"),
    customer_name: z
        .string()
        .min(2, "نام مشتری باید حداقل 2 کاراکتر باشد")
        .max(255, "نام مشتری نمی‌تواند بیشتر از 255 کاراکتر باشد"),
    customer_phone_number: z
        .string()
        .min(5, "شماره تلفن معتبر نیست")
        .max(30, "شماره تلفن معتبر نیست"),
    customer_email: z
        .string()
        .email("فرمت ایمیل درست نمی‌باشد")
        .min(5, "ایمیل معتبر نیست")
        .max(254, "ایمیل طولانی است"),
    customer_address: z
        .string()
        .min(5, "آدرس باید حداقل 5 کاراکتر باشد")
        .max(1024, "آدرس طولانی است"),
    status: z.enum(["pending", "paid", "cancelled"], "وضعیت نامعتبر است"),
    payment_mode: z.enum(["cash", "card", "online"], "روش پرداخت نامعتبر است"),
});

export type InvoiceFormType = z.infer<typeof InvoiceSchema>;