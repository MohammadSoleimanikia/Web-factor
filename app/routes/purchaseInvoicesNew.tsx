// app/routes/purchaseInvoicesNew.tsx
import CreatePurchaseInvoiceForm from "@/features/purchase-invoices/components/CreatePurchaseInvoiceForm";

export default function PurchaseInvoicesNewPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">ثبت فاکتور خرید</h1>
                <p className="text-muted-foreground text-sm">
                    کالاهای خریداری‌شده و اطلاعات تأمین‌کننده را وارد کنید.
                </p>
            </div>

            <CreatePurchaseInvoiceForm />
        </div>
    );
}