// app/features/purchase-invoices/components/purchaseInvoiceForm/PurchaseItemsTable.tsx
import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { Product } from "@/features/products/types/product";
import { Button } from "@/features/shared/components/ui/button";
import { Input } from "@/features/shared/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/features/shared/components/ui/table";

import type { PurchaseInvoiceFormType } from "../../schema/purchaseInvoice.schema";

type PurchaseItemsTableProps = {
    products: Product[];
};

export default function PurchaseItemsTable({
    products,
}: PurchaseItemsTableProps) {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<PurchaseInvoiceFormType>();

    const items = watch("items") ?? [];

    const handleRemove = (index: number) => {
        setValue(
            "items",
            items.filter((_, itemIndex) => itemIndex !== index),
            { shouldValidate: true, shouldDirty: true },
        );
    };

    return (
        <div className="overflow-x-auto rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted">
                        <TableHead>کالا</TableHead>
                        <TableHead>تعداد</TableHead>
                        <TableHead>قیمت خرید واحد</TableHead>
                        <TableHead>جمع ردیف</TableHead>
                        <TableHead className="w-20">عملیات</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {items.map((item, index) => {
                        const product = products.find(
                            (p) => p.id === item.product_id,
                        );

                        const quantity = Number(item.quantity) || 0;
                        const unitCost = Number(item.unit_cost) || 0;
                        const rowTotal = quantity * unitCost;

                        return (
                            <TableRow key={`${item.product_id}-${index}`}>
                                <TableCell className="font-medium whitespace-nowrap">
                                    {product?.name ??
                                        `کالا #${item.product_id}`}
                                </TableCell>

                                <TableCell className="min-w-28">
                                    <Input
                                        type="number"
                                        min={1}
                                        {...register(
                                            `items.${index}.quantity`,
                                            {
                                                valueAsNumber: true,
                                            },
                                        )}
                                        placeholder="تعداد"
                                    />
                                    {errors.items?.[index]?.quantity && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                errors.items[index]?.quantity
                                                    ?.message
                                            }
                                        </span>
                                    )}
                                </TableCell>

                                <TableCell className="min-w-36">
                                    <Input
                                        type="number"
                                        min={0}
                                        step="any"
                                        {...register(
                                            `items.${index}.unit_cost`,
                                            {
                                                valueAsNumber: true,
                                            },
                                        )}
                                        placeholder="قیمت خرید"
                                    />
                                    {errors.items?.[index]?.unit_cost && (
                                        <span className="text-red-500 text-xs">
                                            {
                                                errors.items[index]?.unit_cost
                                                    ?.message
                                            }
                                        </span>
                                    )}
                                </TableCell>

                                <TableCell className="whitespace-nowrap">
                                    {rowTotal.toLocaleString()} تومان
                                </TableCell>

                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        aria-label="حذف کالا"
                                        onClick={() => handleRemove(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

            {errors.items?.message && (
                <p className="text-red-500 text-sm p-3">
                    {errors.items.message}
                </p>
            )}
        </div>
    );
}
