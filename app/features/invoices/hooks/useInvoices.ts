import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api";

import type { PaginatedInvoiceList } from "../types/invoicePreview.type";

type UseInvoiceParams = {
    searchQuery?: string;
    status?: string;
    page?: number;
    pageSize: number;
};
export function useInvoices({
    page = 1,
    pageSize = 10,
    searchQuery = "",
    status = "all",
}: UseInvoiceParams) {
    // make params
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("page_size", pageSize.toString());

    if (searchQuery && searchQuery.trim()) {
        params.append("customer_name", searchQuery.trim());
    }

    if (status && status !== "all") {
        params.append("status", status);
    }

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["invoices", { searchQuery, status, page }],
        queryFn: async () => {
            const url = `/user/invoices/?${params.toString()}`;
            return await apiFetch<PaginatedInvoiceList>(url);
        },
        staleTime: 2 * 60 * 1000,
    });

    return {
        invoices: data?.results || [],
        count: data?.count || 0,
        isLoading,
        error,
        refetch,
    };
}
