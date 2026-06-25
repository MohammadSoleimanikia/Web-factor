// app/features/purchase-invoices/types/purchaseInvoice.types.ts

export type PurchaseInvoiceStatus = "pending" | "completed" | "cancelled";

export type PurchaseInvoiceItem = {
    product: {
        id: number;
        name: string;
        price: number;
    };
    quantity: number;
    unit_cost: number;
};

export type PurchaseInvoice = {
    id: string;
    supplier_name: string | null;
    supplier_phone: string | null;
    supplier_email: string | null;
    supplier_address: string | null;
    invoice_number: string | null;
    items: PurchaseInvoiceItem[];
    status: PurchaseInvoiceStatus;
    discount: number;
    added_value: number;
    total_amount: number;
    purchased_time: string | null;
    created: string;
};

export type PurchaseInvoiceCreate = {
    supplier_name?: string | null;
    supplier_phone?: string | null;
    supplier_email?: string | null;
    supplier_address?: string | null;
    invoice_number?: string | null;
    items: {
        product_id: number;
        quantity: number;
        unit_cost: number;
    }[];
    status?: PurchaseInvoiceStatus;
    discount?: number;
    added_value?: number;
    purchased_time?: string;
};

export type PurchaseInvoiceUpdate = Partial<PurchaseInvoiceCreate>;

export type PaginatedPurchaseInvoiceList = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PurchaseInvoice[];
};
