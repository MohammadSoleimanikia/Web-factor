// app/features/purchase-invoices/hooks/usePurchaseInvoices.ts
import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api";

import type { PaginatedPurchaseInvoiceList } from "../types/purchaseInvoice.types";

type UsePurchaseInvoicesParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
};

export function usePurchaseInvoices({
    page = 1,
    pageSize = 10,
    search = "",
    status = "all",
}: UsePurchaseInvoicesParams = {}) {
    return useQuery<PaginatedPurchaseInvoiceList>({
        queryKey: ["purchase-invoices", { page, pageSize, search, status }],
        queryFn: async () => {
            const params = new URLSearchParams();

            params.set("page", String(page));
            params.set("page_size", String(pageSize));

            if (search.trim()) {
                params.set("supplier_name", search.trim());
            }

            if (status && status !== "all") {
                params.set("status", status);
            }

            return await apiFetch<PaginatedPurchaseInvoiceList>(
                `/user/purchase-invoices/?${params.toString()}`,
            );
        },
        staleTime: 2 * 60 * 1000,
    });
}
