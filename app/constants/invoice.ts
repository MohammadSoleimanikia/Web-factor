import type { Invoice } from "@/types/invoice";

/* ================= STATUS ================= */

export const invoiceStatusFa: Record<NonNullable<Invoice["status"]>, string> = {
    pending: "در انتظار پرداخت",
    paid: "پرداخت‌شده",
    cancelled: "لغو شده",
};

/* ============== PAYMENT MODE ============== */

export const paymentModeFa: Record<
    NonNullable<Invoice["payment_mode"]>,
    string
> = {
    cash: "نقدی",
    card: "کارت",
    bank: "انتقال بانکی",
    others: "سایر",
};
