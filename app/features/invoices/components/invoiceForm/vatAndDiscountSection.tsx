// features/invoices/components/InvoiceForm/vatAndDiscountSection.tsx
import num2persian from "num2persian";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";
import { Switch } from "@/features/shared/components/ui/switch";

import type { InvoiceFormType } from "../../schema/invoice.schema";

interface VatAndDiscountSectionProps {
    vatEnabled: boolean;
    onVatToggle: (enabled: boolean) => void;
    addedValue: number;
}

export default function VatAndDiscountSection({
    vatEnabled,
    onVatToggle,
    addedValue,
}: VatAndDiscountSectionProps) {
    const { control, watch } = useFormContext<InvoiceFormType>();
    const [discountPersian, setDiscountPersian] = useState("");
    const discountValue = watch("discount");

    // تبدیل تخفیف به فارسی هنگام تغییر
    useEffect(() => {
        setDiscountPersian(num2persian(discountValue?.toString() || "0"));
    }, [discountValue]);

    return (
        <div className="grid grid-cols-1 gap-4">
            {/* تخفیف */}
            <div className="flex flex-col sm:w-2/12">
                <Label htmlFor="discount">تخفیف</Label>
                <Controller
                    control={control}
                    name="discount"
                    render={({ field }) => (
                        <div>
                            <Input
                                {...field}
                                type="number"
                                min={0}
                                step={1}
                                onChange={(e) => {
                                    const value = e.target.valueAsNumber;
                                    field.onChange(isNaN(value) ? 0 : value);
                                    setDiscountPersian(
                                        num2persian(e.target.value),
                                    );
                                }}
                            />
                            {discountPersian && discountPersian !== "صفر" && (
                                <span className="text-sm text-muted-foreground mt-1 block">
                                    {discountPersian} تومان
                                </span>
                            )}
                        </div>
                    )}
                />
            </div>

            {/* ارزش افزوده */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Switch
                        checked={vatEnabled}
                        onCheckedChange={onVatToggle}
                    />
                    <Label>ارزش افزوده (۱۰٪)</Label>
                </div>
                {vatEnabled && (
                    <span className="text-sm text-muted-foreground">
                        مبلغ ارزش افزوده:{" "}
                        <strong>{addedValue?.toLocaleString() ?? 0}</strong>{" "}
                        تومان
                    </span>
                )}
            </div>
        </div>
    );
}
