// app/routes/purchaseInvoicesId.tsx
import { Link, useParams } from "react-router";

import PurchaseInvoiceDetail from "@/features/purchase-invoices/components/PurchaseInvoiceDetail";
import { Button } from "@/features/shared/components/ui/button";

export default function PurchaseInvoicesIdPage() {
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        جزئیات فاکتور خرید
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        مشاهده اطلاعات خرید، تأمین‌کننده و کالاها
                    </p>
                </div>

                <Link to="/purchase-invoices">
                    <Button variant="outline">بازگشت به لیست</Button>
                </Link>
            </div>

            <PurchaseInvoiceDetail id={id} />
        </div>
    );
}