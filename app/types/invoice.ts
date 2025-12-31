import type { Product } from "./product";

export type Invoice = {
    id: string;
    invoice_number: string;
    creator: string | null;
    items: InvoiceItem[];
    total_amount: number;
    customer_name?: string | null;
    customer_phone_number?: string | null;
    customer_email?: string | null;
    customer_address?: string | null;
    status?: "pending" | "paid" | "cancelled";
    payment_mode?: "cash" | "card" | "bank" | "others";
    created: string;
    updated: string;
};

export type InvoiceItem = {
    id: number;
    product: Product;
    price: number;
    quantity: number;
};

export type PaginatedInvoiceList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Invoice[];
};

export type InvoiceViewModel = {
    invoiceNumber: string;
    createdAt: string;
    customer: {
        name: string | null | undefined;
        address: string | null | undefined;
        phone: string | null | undefined;
        email: string;
    };
    items: {
        name: string;
        quantity: number;
        unitPrice: number;
        total: number;
    }[];
    total: number;
    totalText: string;
    statusText: string;
    paymentText: string;
};
