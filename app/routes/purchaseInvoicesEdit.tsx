// app/routes/purchaseInvoicesEdit.tsx
import { useParams } from "react-router";

import EditPurchaseInvoiceForm from "@/features/purchase-invoices/components/EditPurchaseInvoiceForm";

export default function PurchaseInvoicesEditPage() {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div className="py-10 text-center text-red-500">
                شناسه فاکتور خرید معتبر نیست
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">ویرایش فاکتور خرید</h1>
                <p className="text-muted-foreground text-sm">
                    فقط فاکتورهای خرید در وضعیت در انتظار قابل ویرایش هستند.
                </p>
            </div>

            <EditPurchaseInvoiceForm id={id} />
        </div>
    );
}