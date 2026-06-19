// features/invoices/components/shared/itemsTable.tsx
import { Package } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";

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
    products?: any[];
    isEdit?: boolean;
}

export default function ItemsTable({
    products = [],
    isEdit = false,
}: ItemsTableProps) {
    const { control, watch } = useFormContext<InvoiceFormType>();
    const watchedItems = watch("items");

    const getProductName = (item: any) => {
        if (item.product_name) return item.product_name;
        if (item.product_id) {
            const product = products.find((p) => p.id === item.product_id);
            if (product?.name) return product.name;
        }
        return "نامشخص";
    };

    if (watchedItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center border rounded-lg bg-muted/20">
                <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
                    <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                    هنوز کالایی به فاکتور اضافه نشده است
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                    از بخش "انتخاب کالا با بارکد" یا "انتخاب با نام کالا"
                    محصولات را اضافه کنید
                </p>
            </div>
        );
    }

    return (
        <div>
            <Label className="mb-2 block">کالاها</Label>
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted">
                        <TableHead>نام کالا</TableHead>
                        <TableHead>تعداد</TableHead>
                        <TableHead>قیمت (تومان)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {watchedItems.map((item, index) => {
                        return (
                            <TableRow key={item.product_id || index}>
                                <TableCell>{getProductName(item)}</TableCell>
                                <TableCell>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.quantity`}
                                        disabled={isEdit}
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
                                        disabled={isEdit}
                                        name={`items.${index}.price`}
                                        render={({
                                            field,
                                            fieldState: { error },
                                        }) => (
                                            <div>
                                                <NumericFormat
                                                    value={field.value || 0}
                                                    thousandSeparator=","
                                                    decimalSeparator="."
                                                    placeholder="۰"
                                                    className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                                                        error
                                                            ? "border-red-500"
                                                            : "border-input"
                                                    }`}
                                                    onValueChange={(values) => {
                                                        const rawValue =
                                                            values.floatValue ||
                                                            0;
                                                        field.onChange(
                                                            rawValue,
                                                        );
                                                    }}
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
