import { Controller, useFormContext } from "react-hook-form";

import type { Customer } from "@/features/customers/types/customer";
import { Combobox } from "@/features/shared/components/ui/comboBox";
import { Label } from "@/features/shared/components/ui/label";

import type { InvoiceFormType } from "../../schema/invoice.schema";

type CustomerComboboxProps = {
    customers?: Customer[];
};
export default function CustomerComboBox({ customers=[] }: CustomerComboboxProps) {
    const {
        control,
        formState: { errors },
        setValue,
    } = useFormContext<InvoiceFormType>();
    const customerOptions = customers.map((c) => ({
        value: c.name,
        id: c.id,
    }));
    return (
        <Controller
            control={control}
            name="id"
            render={({ field }) => (
                <div className="space-y-2 sm:w-6/12">
                    <Label>انتخاب و جستجوی مشتری</Label>
                    {customerOptions && (
                        <Combobox
                            items={customerOptions?.map((c) => ({
                                value: c.value,
                                label: c.value,
                            }))}
                            value={
                                field.value
                                    ? customers?.find(
                                          (c) => c.id === field.value,
                                      )?.name
                                    : undefined
                            }
                            onChange={(val) => {
                                const selectedCustomer = customers?.find(
                                    (c) => c.name === val,
                                );

                                if (!selectedCustomer) return;

                                field.onChange(selectedCustomer.id);

                                setValue(
                                    "customer_name",
                                    selectedCustomer.name,
                                );
                                setValue(
                                    "customer_phone_number",
                                    selectedCustomer.phone_number || "",
                                );
                                setValue(
                                    "customer_email",
                                    selectedCustomer.email || "",
                                );
                                setValue(
                                    "customer_address",
                                    selectedCustomer.address || "",
                                );
                            }}
                            placeholder="مشتری را انتخاب کن"
                            searchPlaceholder="جستجوی مشتری..."
                        />
                    )}
                    {errors.id && (
                        <span className="text-red-500">
                            {errors.id.message}
                        </span>
                    )}
                </div>
            )}
        />
    );
}
