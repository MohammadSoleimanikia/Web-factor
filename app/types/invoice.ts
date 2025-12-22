export type Invoice = {
    id: string;
    invoice_number:number;
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
    product: number;
    quantity: number;
    price: string;
};

export type PaginatedInvoiceList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Invoice[];
};