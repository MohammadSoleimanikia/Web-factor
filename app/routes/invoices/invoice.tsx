import Classic from "@/components/invoices/templates/classic";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Invoice } from "@/types/invoice";
import type { User } from "@/types/user";
import type { Product } from "@/types/product";
import { buildInvoiceViewModel } from "@/lib/invoiceViewModel";
import Minimal from "@/components/invoices/templates/minimal";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Modern from "@/components/invoices/templates/modern";
import { Button } from "@/components/ui/button";

export default function Invoice() {
    const { id } = useParams<{ id: string }>();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [template, setTemplate] = useState("minimal");
    useEffect(() => {
        const fetchInvoice = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const result = await apiFetch(`/user/invoices/${id}/`);
                const productsResult = await apiFetch(
                    `/user/products/?page=1&page_size=10000`
                );

                setInvoice(result);
                setProducts(productsResult.results);
            } catch (err: any) {
                console.error(err);
                setError("Failed to load invoice");
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await apiFetch(`/account/profile/`);
                setUser(result);
            } catch (err: any) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!invoice) return <div>Invoice not found</div>;

    const viewModel = buildInvoiceViewModel({ invoice, products });
    return (
        <>
            <div className="mb-4 flex gap-4">
                <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger className="w-fit bg-white">
                        <SelectValue placeholder="Template" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="classic">کلاسیک</SelectItem>
                        <SelectItem value="minimal">مینیمال</SelectItem>
                        <SelectItem value="modern">مدرن</SelectItem>
                    </SelectContent>
                </Select>
                <Button>چاپ</Button>
            </div>
            <div className="overflow-x-scroll bg-muted p-5 space-y-3">
                <div>
                    {template === "classic" ? (
                        <Classic invoice={viewModel} user={user} />
                    ) : template === "modern" ? (
                        <Modern invoice={viewModel} user={user} />
                    ) : (
                        <Minimal invoice={viewModel} user={user} />
                    )}
                </div>
            </div>
        </>
    );
}
