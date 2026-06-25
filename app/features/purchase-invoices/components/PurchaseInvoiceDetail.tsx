// app/features/purchase-invoices/components/PurchaseInvoiceDetail.tsx
import { Edit } from "lucide-react";
import num2persian from "num2persian";
import { useNavigate } from "react-router";

import { Button } from "@/features/shared/components/ui/button";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

import { usePurchaseInvoice } from "../hooks/usePurchaseInvoice";
import { CancelPurchaseInvoiceButton } from "./CancelPurchaseInvoiceButton";
import { CompletePurchaseInvoiceButton } from "./CompletePurchaseInvoiceButton";
import { PurchaseInvoiceStatusBadge } from "./PurchaseInvoiceStatusBadge";

type PurchaseInvoiceDetailProps = {
    id: string;
};

function formatCurrency(value?: number | null) {
    return Number(value ?? 0).toLocaleString("fa-IR");
}

function formatDate(date?: string | null) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function PurchaseInvoiceDetail({ id }: PurchaseInvoiceDetailProps) {
    const navigate = useNavigate();

    const { data: invoice, isLoading, error, refetch } = usePurchaseInvoice(id);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="text-center py-10 space-y-4">
                <p className="text-red-500">خطا در دریافت فاکتور خرید</p>

                <Button variant="outline" onClick={() => refetch()}>
                    تلاش مجدد
                </Button>
            </div>
        );
    }

    if (!invoice) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">فاکتور خرید یافت نشد</p>

                <Button
                    className="mt-4"
                    onClick={() => navigate("/purchase-invoices")}
                >
                    بازگشت به لیست
                </Button>
            </div>
        );
    }

    const subtotal =
        invoice.items?.reduce((sum, item) => {
            return sum + Number(item.quantity) * Number(item.unit_cost);
        }, 0) ?? 0;

    const discount = Number(invoice.discount ?? 0);
    const addedValue = Number(invoice.added_value ?? 0);
    const totalAmount = Number(
        invoice.total_amount ?? subtotal + addedValue - discount,
    );

    const canEdit = invoice.status === "pending";

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                    <h2 className="text-xl font-bold">
                        فاکتور خرید {invoice.invoice_number || "-"}
                    </h2>

                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">
                            وضعیت:
                        </span>
                        <PurchaseInvoiceStatusBadge status={invoice.status} />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {canEdit && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                navigate(`/purchase-invoices/edit/${invoice.id}`)
                            }
                        >
                            <Edit className="ml-2 h-4 w-4" />
                            ویرایش
                        </Button>
                    )}

                    {canEdit && (
                        <>
                            <CompletePurchaseInvoiceButton
                                id={invoice.id}
                                variant="outline"
                            />

                            <CancelPurchaseInvoiceButton
                                id={invoice.id}
                                variant="destructive"
                            />
                        </>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border p-4 space-y-1">
                    <p className="text-sm text-muted-foreground">تاریخ خرید</p>
                    <p className="font-medium">
                        {formatDate(invoice.purchased_time)}
                    </p>
                </div>

                <div className="rounded-lg border p-4 space-y-1">
                    <p className="text-sm text-muted-foreground">تاریخ ثبت</p>
                    <p className="font-medium">{formatDate(invoice.created)}</p>
                </div>

                <div className="rounded-lg border p-4 space-y-1">
                    <p className="text-sm text-muted-foreground">مبلغ نهایی</p>
                    <p className="font-bold">
                        {formatCurrency(totalAmount)} تومان
                    </p>
                </div>
            </div>

            <div className="rounded-lg border p-5 space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-primary" />
                    <h3 className="text-lg font-semibold">
                        اطلاعات تأمین‌کننده
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            نام تأمین‌کننده
                        </p>
                        <p className="font-medium">
                            {invoice.supplier_name || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            شماره تلفن
                        </p>
                        <p className="font-medium">
                            {invoice.supplier_phone || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">ایمیل</p>
                        <p className="font-medium">
                            {invoice.supplier_email || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">آدرس</p>
                        <p className="font-medium">
                            {invoice.supplier_address || "-"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h3 className="text-lg font-semibold">
                            کالاهای خریداری‌شده
                        </h3>
                    </div>

                    <span className="text-sm text-muted-foreground">
                        {invoice.items?.length ?? 0} کالا
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">کالا</TableHead>
                                <TableHead className="text-right">تعداد</TableHead>
                                <TableHead className="text-right">
                                    قیمت خرید
                                </TableHead>
                                <TableHead className="text-right">
                                    جمع ردیف
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {invoice.items.map((item) => {
                                const rowTotal =
                                    Number(item.quantity) *
                                    Number(item.unit_cost);

                                return (
                                    <TableRow key={item.product.id}>
                                        <TableCell className="font-medium">
                                            {item.product.name}
                                        </TableCell>

                                        <TableCell>
                                            {Number(
                                                item.quantity,
                                            ).toLocaleString("fa-IR")}
                                        </TableCell>

                                        <TableCell>
                                            {formatCurrency(item.unit_cost)} تومان
                                        </TableCell>

                                        <TableCell>
                                            {formatCurrency(rowTotal)} تومان
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="rounded-lg border p-5 space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-1 rounded-full bg-primary" />
                    <h3 className="text-lg font-semibold">خلاصه مالی</h3>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">جمع کالاها</span>
                        <span>{formatCurrency(subtotal)} تومان</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">ارزش افزوده</span>
                        <span>{formatCurrency(addedValue)} تومان</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">تخفیف</span>
                        <span>{formatCurrency(discount)} تومان</span>
                    </div>

                    <div className="border-t pt-3 flex items-center justify-between text-lg font-bold">
                        <span>مبلغ نهایی</span>
                        <span>{formatCurrency(totalAmount)} تومان</span>
                    </div>

                    <div className="rounded-md bg-muted p-3 text-sm">
                        <span className="text-muted-foreground">
                            مبلغ به حروف:{" "}
                        </span>
                        <span className="font-medium">
                            {num2persian(String(totalAmount))} تومان
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}