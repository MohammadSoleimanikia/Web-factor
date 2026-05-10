import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import InvoicePreview from "@/features/invoices/components/invoicePreview";
import { TemplateSelector } from "@/features/invoices/components/templateSelector";
import type { Invoice } from "@/features/invoices/types/invoicePreview.type";
import { apiFetch } from "@/lib/api";
import type { User } from "@/types/user";
export type TemplateType = "classic" | "modern" | "minimal";
export default function Invoice() {
    const { id } = useParams<{ id: string }>();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [template, setTemplate] = useState<TemplateType>("minimal");
    useEffect(() => {
        const fetchInvoice = async () => {
            if (!id) return;
            setLoading(true);
            setError(null);
            try {
                const result = await apiFetch<Invoice>(`/user/invoices/${id}/`);

                setInvoice(result);
            } catch (err: any) {
                console.error(err);
                setError("بارگذاری فاکتور ناموفق بود!");
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await apiFetch<User>(`/account/profile/`);
                setUser(result);
            } catch (err: any) {
                console.error(err);
            }
        };
        fetchUser();
    }, []);
    if (loading) return <LoadingSpinner />;
    if (error) return <div>خطا: {error}</div>;
    if (!invoice) return <div>فاکتور پیدا نشد</div>;

    return (
        <>
            <div className="mb-4 flex gap-4 print:hidden">
                <TemplateSelector
                    setTemplate={setTemplate}
                    template={template}
                />
                <Button onClick={() => window.print()}>چاپ</Button>
            </div>

            <InvoicePreview user={user} invoice={invoice} template={template} />
        </>
    );
}
