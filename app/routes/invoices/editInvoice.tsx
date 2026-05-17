// routes/invoices/editInvoice.tsx
import { useParams } from "react-router";

import EditInvoiceForm from "@/features/invoices/components/editInvoiceForm";

export default function EditInvoice() {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <div>شناسه فاکتور معتبر نیست</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <EditInvoiceForm invoiceId={id} />
        </div>
    );
}
