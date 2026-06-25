// app/features/purchase-invoices/components/purchaseInvoiceForm/PurchaseProductMultiSelect.tsx
import { Controller, useFormContext } from "react-hook-form";

import type { Product } from "@/features/products/types/product";
import { Label } from "@/features/shared/components/ui/label";
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/features/shared/components/ui/multi-select";

import type { PurchaseInvoiceFormType } from "../../schema/purchaseInvoice.schema";

type PurchaseProductMultiSelectProps = {
    products: Product[];
};

function getDefaultUnitCost(product?: Product) {
    return Number(product?.last_buy_price ?? product?.price ?? 0);
}

export default function PurchaseProductMultiSelect({
    products,
}: PurchaseProductMultiSelectProps) {
    const { control } = useFormContext<PurchaseInvoiceFormType>();

    return (
        <Controller
            control={control}
            name="items"
            render={({ field, fieldState: { error } }) => {
                const items = field.value ?? [];

                return (
                    <div className="flex flex-col gap-2">
                        <Label>انتخاب با نام کالا</Label>

                        <MultiSelect
                            values={items.map((item) =>
                                String(item.product_id),
                            )}
                            onValuesChange={(values) => {
                                const newItems = values.map((value) => {
                                    const productId = Number(value);

                                    const existingItem = items.find(
                                        (item) => item.product_id === productId,
                                    );

                                    if (existingItem) {
                                        return existingItem;
                                    }

                                    const product = products.find(
                                        (p) => p.id === productId,
                                    );

                                    return {
                                        product_id: productId,
                                        quantity: 1,
                                        unit_cost: getDefaultUnitCost(product),
                                    };
                                });

                                field.onChange(newItems);
                            }}
                        >
                            <MultiSelectTrigger className="w-full hover:bg-primary-foreground bg-primary-foreground">
                                <MultiSelectValue
                                    placeholder="کالا را جستجو کن"
                                    overflowBehavior="wrap"
                                />
                            </MultiSelectTrigger>

                            <MultiSelectContent search>
                                <MultiSelectGroup>
                                    {products.map((product) => (
                                        <MultiSelectItem
                                            key={product.id}
                                            value={String(product.id)}
                                        >
                                            {product.name}
                                        </MultiSelectItem>
                                    ))}
                                </MultiSelectGroup>
                            </MultiSelectContent>
                        </MultiSelect>

                        {error && (
                            <span className="text-red-500 text-sm">
                                {error.message || "انتخاب کالا الزامی است"}
                            </span>
                        )}
                    </div>
                );
            }}
        />
    );
}
