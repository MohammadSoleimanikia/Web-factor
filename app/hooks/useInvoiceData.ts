import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { apiFetch } from "@/lib/api";
import type { InvoiceFormType } from "@/schemas/invoice.schema";
import type { Customer, PaginatedCustomerList } from "@/types/customer";
import type { Invoice } from "@/types/invoice";
import type { PaginatedProductList, Product } from "@/types/product";

interface UseInvoiceDataProps {
    invoiceID?: string;
    reset: ReturnType<typeof useForm<InvoiceFormType>>["reset"];
}

export function useInvoiceData({ invoiceID, reset }: UseInvoiceDataProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);

                const [productsRes, customersRes] = await Promise.all([
                    apiFetch<PaginatedProductList>(
                        "/user/products/?page_size=1000",
                    ),
                    apiFetch<PaginatedCustomerList>(
                        "/account/customers/?page_size=1000",
                    ),
                ]);

                setProducts(productsRes.results);
                setCustomers(customersRes.results);

                if (invoiceID) {
                    const invoice = await apiFetch<Invoice>(
                        `/user/invoices/${invoiceID}/`,
                    );

                    reset({
                        items: invoice.items.map((item) => ({
                            product_id: item.product.id,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                        customer_name: invoice.customer_name ?? "",
                        customer_phone_number:
                            invoice.customer_phone_number ?? "",
                        customer_email: invoice.customer_email ?? "",
                        customer_address: invoice.customer_address ?? "",
                        descriptions: invoice.descriptions ?? "",
                        title: invoice.title ?? "",
                        status: invoice.status ?? "pending",
                        payment_mode: invoice.payment_mode ?? "cash",
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [invoiceID, reset]);

    return { products, customers, isLoading };
}
