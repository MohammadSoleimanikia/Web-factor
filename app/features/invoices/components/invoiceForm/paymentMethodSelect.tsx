// features/invoices/components/InvoiceForm/InvoicePaymentMethodSelect.tsx
import { Controller, useFormContext } from "react-hook-form";

import { Label } from "@/features/shared/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, 
} from "@/features/shared/components/ui/select";

import type { InvoiceFormType } from "../../schema/invoice.schema";

export default function InvoicePaymentMethodSelect() {
    const {
        control,
        formState: { errors },
    } = useFormContext<InvoiceFormType>();

    return (
        <div className="space-y-3">
            <Label htmlFor="payment_mode">روش پرداخت</Label>
            <Controller
                control={control}
                name="payment_mode"
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="text-right px-3 py-2 border rounded-md">
                            <SelectValue placeholder="روش پرداخت" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cash">نقد</SelectItem>
                            <SelectItem value="card">کارت</SelectItem>
                            <SelectItem value="bank">بانک</SelectItem>
                            <SelectItem value="others">سایر</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.payment_mode && (
                <span className="text-red-500">
                    {errors.payment_mode.message}
                </span>
            )}
        </div>
    );
}
