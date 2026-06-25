// app/features/purchase-invoices/components/purchaseInvoiceForm/PurchaseVatAndDiscountSection.tsx
import num2persian from "num2persian";
import { useFormContext } from "react-hook-form";

import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";

import type { PurchaseInvoiceFormType } from "../../schema/purchaseInvoice.schema";

type PurchaseVatAndDiscountSectionProps = {
    vatEnabled: boolean;
    onVatToggle: (enabled: boolean) => void;
    addedValue: number;
};

export default function PurchaseVatAndDiscountSection({
    vatEnabled,
    onVatToggle,
    addedValue,
}: PurchaseVatAndDiscountSectionProps) {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<PurchaseInvoiceFormType>();

    const items = watch("items") ?? [];
    const discount = Number(watch("discount")) || 0;

    const subtotal = items.reduce((sum, item) => {
        const quantity = Number(item.quantity) || 0;
        const unitCost = Number(item.unit_cost) || 0;

        return sum + quantity * unitCost;
    }, 0);

    const total = Math.max(0, subtotal + Number(addedValue || 0) - discount);
    const totalText = total > 0 ? num2persian(String(total)) : "صفر";

    return (
        <div className="space-y-4 rounded-lg border p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="purchase-discount">تخفیف (تومان)</Label>
                    <Input
                        id="purchase-discount"
                        type="number"
                        min={0}
                        step="any"
                        {...register("discount", {
                            valueAsNumber: true,
                        })}
                        placeholder="مبلغ تخفیف"
                    />
                    {errors.discount && (
                        <span className="text-red-500 text-sm">
                            {errors.discount.message}
                        </span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label>ارزش افزوده</Label>
                    <div className="flex items-center gap-2 rounded-md border px-3 py-2 h-10">
                        <input
                            id="purchase-vat-toggle"
                            type="checkbox"
                            checked={vatEnabled}
                            onChange={(e) => onVatToggle(e.target.checked)}
                            aria-label="فعال‌سازی ارزش افزوده"
                            className="h-4 w-4"
                        />
                        <Label
                            htmlFor="purchase-vat-toggle"
                            className="cursor-pointer"
                        >
                            محاسبه ارزش افزوده ۱۰٪
                        </Label>
                    </div>
                </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">جمع کالاها:</span>
                    <span className="font-medium">
                        {subtotal.toLocaleString()} تومان
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ارزش افزوده:</span>
                    <span className="font-medium">
                        {Number(addedValue || 0).toLocaleString()} تومان
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">تخفیف:</span>
                    <span className="font-medium">
                        {discount.toLocaleString()} تومان
                    </span>
                </div>

                <div className="flex items-center justify-between text-lg font-bold pt-2 border-t">
                    <span>مبلغ قابل پرداخت:</span>
                    <span className="text-primary">
                        {total.toLocaleString()} تومان
                    </span>
                </div>

                <div className="rounded-md bg-muted p-3 text-sm leading-7">
                    <span className="font-medium">به حروف: </span>
                    <span>{totalText} تومان</span>
                </div>
            </div>
        </div>
    );
}
