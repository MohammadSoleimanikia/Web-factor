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
    products?: any[]; 
    isEdit?:boolean;
}

export default function ItemsTable({ products = [] ,isEdit=false }: ItemsTableProps) {
    const {
        control,
        watch,
    } = useFormContext<InvoiceFormType>();
    const watchedItems = watch("items");

    if (watchedItems.length === 0) return null;

    const getProductName = (item: any) => {
        if (item.product_name) return item.product_name;

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
                        <TableHead>تعداد</TableHead>
                        <TableHead>قیمت</TableHead>
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
