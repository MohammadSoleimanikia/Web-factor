// features/payment/types/payment.types.ts

export type PurchasePlanRequest = {
    plan_id: number;
};

export type PurchasePlanResponse = {
    gateway_url: string;
    payment_id?: string;
};

export type PaymentStatus = "pending" | "success" | "failed" | "invalid";

export type PaymentResult = {
    status: PaymentStatus;
    tracking_code?: string;
    payment_id?: string;
    message?: string;
};