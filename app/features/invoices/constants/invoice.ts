
/* ================= ENUMS ================= */

export enum InvoiceStatus {
    PENDING = "pending",
    PAID = "paid",
    CANCELLED = "cancelled",
}

export enum PaymentMode {
    CASH = "cash",
    CARD = "card",
    BANK = "bank",
    OTHERS = "others",
}

/* ================= STATUS ================= */

export const INVOICE_STATUS_VALUES = Object.values(InvoiceStatus);

export const invoiceStatusFa: Record<InvoiceStatus, string> = {
    [InvoiceStatus.PENDING]: "در انتظار پرداخت",
    [InvoiceStatus.PAID]: "پرداخت‌شده",
    [InvoiceStatus.CANCELLED]: "لغو شده",
};

export const invoiceStatusOptions = INVOICE_STATUS_VALUES.map((status) => ({
    value: status,
    label: invoiceStatusFa[status as InvoiceStatus],
}));

/* ============== PAYMENT MODE ============== */

export const PAYMENT_MODE_VALUES = Object.values(PaymentMode);

export const paymentModeFa: Record<PaymentMode, string> = {
    [PaymentMode.CASH]: "نقدی",
    [PaymentMode.CARD]: "کارت",
    [PaymentMode.BANK]: "انتقال بانکی",
    [PaymentMode.OTHERS]: "سایر",
};

export const paymentModeOptions = PAYMENT_MODE_VALUES.map((mode) => ({
    value: mode,
    label: paymentModeFa[mode as PaymentMode],
}));
