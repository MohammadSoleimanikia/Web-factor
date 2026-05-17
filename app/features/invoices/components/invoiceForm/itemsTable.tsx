import { Controller, useFormContext } from "react-hook-form";

import type { Product } from "@/features/products/types/product";
import  { Input } from "@/features/shared/components/ui/input";
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
type ItemsTableProps = {
    products: Product[];
};
export default function ItemsTable({products}:ItemsTableProps) {
    const {
        control,
        watch,
        formState: { errors },
    } = useFormContext<InvoiceFormType>();
    const watchedItems = watch("items");
    if (watchedItems.length === 0) return null;
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
                        const product = products.find(
                            (p) => p.id === item.product_id,
                        );
                        return (
                            <TableRow key={item.product_id}>
                                <TableCell>
                                    {product?.name || "Unknown"}
                                </TableCell>
                                <TableCell>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.quantity`}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                min={1}
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.valueAsNumber,
                                                    )
                                                }
                                            />
                                        )}
                                    />

                                    {errors.items?.[index]?.quantity && (
                                        <span className="text-red-500">
                                            {
                                                errors.items[index].quantity
                                                    .message
                                            }
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Controller
                                        control={control}
                                        name={`items.${index}.price`}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="number"
                                                min={0}
                                                step="1"
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.valueAsNumber,
                                                    )
                                                }
                                            />
                                        )}
                                    />
                                    {errors.items?.[index]?.price && (
                                        <span className="text-red-500">
                                            {errors.items[index].price.message}
                                        </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
