import { useState } from "react";
import { useParams } from "react-router";

import { Button } from "@/features/shared/components/ui/button";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";
import { useUser } from "@/features/auth/hooks/useUser";
import InvoicePreview from "@/features/invoices/components/invoicePreview";
import { TemplateSelector } from "@/features/invoices/components/templateSelector";
import { useInvoice } from "@/features/invoices/hooks/useInvoice";
import type { Invoice } from "@/features/invoices/types/invoicePreview.type";
export type TemplateType = "classic" | "modern" | "minimal";
export default function Invoice() {
    const { id } = useParams<{ id: string }>();
    const {
        invoice,
        isLoading: isInvoiceLoading,
        isError: isInvoiceError,
        error: invoiceError,
    } = useInvoice(id as string);
    const { user, isLoading: isUserLoading } = useUser();

    const [template, setTemplate] = useState<TemplateType>("minimal");
    if (isInvoiceLoading || isUserLoading) return <LoadingSpinner />;
    if (isInvoiceError) {
        return (
            <div className="text-red-500 text-center py-10">
                خطا: {invoiceError?.message || "بارگذاری فاکتور ناموفق بود!"}
            </div>
        );
    }
    if (!invoice)
        return <div className="text-center py-10">فاکتور پیدا نشد</div>;

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
