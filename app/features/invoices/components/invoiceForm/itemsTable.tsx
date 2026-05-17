// features/invoices/components/shared/itemsTable.tsx
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

import type { InvoiceFormType } from "../../schema/invoice.schema";

interface ItemsTableProps {
    products?: any[]; // optional now
}

export default function ItemsTable({ products = [] }: ItemsTableProps) {
    const {
        control,
        watch,
    } = useFormContext<InvoiceFormType>();
    const watchedItems = watch("items");

    if (watchedItems.length === 0) return null;

    // تابع برای گرفتن نام محصول
    // اول از products array جستجو کن، اگه نبود از product object خود آیتم استفاده کن
    const getProductName = (item: any) => {
        // اگه آیتم product_name داره (برای نمایش در ویرایش)
        if (item.product_name) return item.product_name;

        // اگه product_id داره، توی products جستجو کن
        if (item.product_id) {
            const product = products.find((p) => p.id === item.product_id);
            if (product?.name) return product.name;
        }

        return "نامشخص";
    };

    return (
        <div>
            <Label>کالاها</Label>
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted">
                        <TableHead>نام کالا</TableHead>
                        <TableHead>مقدار</TableHead>
                        <TableHead>قیمت</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {watchedItems.map((item, index) => {
                        console.log("item:", item);

                        return (
                            <TableRow key={item.product_id || index}>
                                <TableCell>{getProductName(item)}</TableCell>
                                <TableCell>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.quantity`}
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    min={1}
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target
                                                                .valueAsNumber,
                                                        )
                                                    }
                                                />
                                                {error && (
                                                    <span className="text-red-500 text-sm">
                                                        {error.message}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.price`}
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    min={0}
                                                    step="1"
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target
                                                                .valueAsNumber,
                                                        )
                                                    }
                                                />
                                                {error && (
                                                    <span className="text-red-500 text-sm">
                                                        {error.message}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
