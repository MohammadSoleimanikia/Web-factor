import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvoiceSchema, type InvoiceFormType } from "@/schemas/invoice.schema";
import { apiFetch } from "@/lib/api";
import type { Product } from "@/types/product";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select";
import type { Customer } from "@/types/customer";
import { set } from "zod";
import { Combobox } from "../ui/comboBox";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function NewInvoiceForm() {
    const [products, setProducts] = useState<Product[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);

    const Navigate = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        setValue,
    } = useForm({
        resolver: zodResolver(InvoiceSchema),
        defaultValues: {
            items: [],
            customer_name: "",
            customer_phone_number: "",
            customer_email: "",
            customer_address: "",
            status: "pending",
            payment_mode: "cash",
        },
    });

    const watchedItems = watch("items");

    const customerOptions = customers.map((c) => ({
        value: c.customer_name,
        id: c.id,
    }));

    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await apiFetch("/user/products/?page_size=1000");
                setProducts(data.results);
            } catch (err) {
                console.error(err);
            }
        };
        const fetchCustomers = async () => {
            try {
                const data = await apiFetch(
                    "/account/customers/?page_size=1000"
                );
                setCustomers(data.results);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
        fetchCustomers();
    }, []);

    const onSubmit = async (data: InvoiceFormType) => {
        try {
            const payload = {
                ...data,
                items: data.items.map((item) => ({
                    ...item,
                    product_id: Number(item.product_id),
                    quantity: Number(item.quantity),
                    price: Number(item.price),
                })),
            };

            const response = await apiFetch("/user/invoices/", {
                method: "POST",
                body: JSON.stringify(payload),
            });
            toast.success("فاکتور با موفقیت ساخته شد!");
            Navigate(`/invoices/${response.id}`);
        } catch (error) {
            console.error("error:", error);
            toast.error("خطا در ساخت فاکتور. لطفا دوباره تلاش کنید.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Selection */}
            <Controller
                control={control}
                name="items"
                render={({ field }) => (
                    <div className="flex flex-col gap-2">
                        <Label>انتخاب کالاها</Label>
                        <MultiSelect
                            values={field.value.map((item) =>
                                String(item.product_id)
                            )}
                            onValuesChange={(vals) => {
                                const newItems = vals.map((val) => {
                                    const existing = field.value.find(
                                        (i) => i.product_id === Number(val)
                                    );
                                    if (existing) return existing;
                                    const product = products.find(
                                        (p) => p.id === Number(val)
                                    );
                                    return {
                                        product_id: Number(val),
                                        quantity: 1,
                                        price: product?.price.toString() || "0",
                                    };
                                });
                                field.onChange(newItems);
                            }}
                        >
                            <MultiSelectTrigger className="w-full hover:bg-primary-foreground bg-primary-foreground">
                                <MultiSelectValue
                                    placeholder="کالا رو جستجو کن"
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
                        {errors.items && (
                            <span className="text-red-500">
                                {errors.items.message ||
                                    "حداقل یک آیتم الزامی است"}
                            </span>
                        )}
                    </div>
                )}
            />

            {/* Items Table */}
            {watchedItems.length > 0 && (
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
                                    (p) => p.id === item.product_id
                                );
                                return (
                                    <TableRow key={item.product_id}>
                                        <TableCell>
                                            {product?.name || "Unknown"}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={999999}
                                                {...register(
                                                    `items.${index}.quantity` as const
                                                )}
                                            />
                                            {errors.items?.[index]
                                                ?.quantity && (
                                                <span className="text-red-500">
                                                    {
                                                        errors.items[index]
                                                            .quantity.message
                                                    }
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                min={0}
                                                step="0.01"
                                                {...register(
                                                    `items.${index}.price` as const
                                                )}
                                                defaultValue={item.price}
                                            />
                                            {errors.items?.[index]?.price && (
                                                <span className="text-red-500">
                                                    {
                                                        errors.items[index]
                                                            .price.message
                                                    }
                                                </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* search customer */}
            <Controller
                control={control}
                name="customer_id"
                render={({ field }) => (
                    <div className="space-y-2 sm:w-6/12">
                        <Label>انتخاب و جستجوی مشتری</Label>
                        <Combobox
                            items={customerOptions.map((c) => ({
                                value: c.value,
                                label: c.value,
                            }))}
                            value={
                                field.value
                                    ? customers.find(
                                        (c) => c.id === field.value
                                    )?.customer_name
                                    : undefined
                            }
                            onChange={(val) => {
                                const selectedCustomer = customers.find(
                                    (c) => c.customer_name === val
                                );

                                if (!selectedCustomer) return;

                                field.onChange(selectedCustomer.id);

                                setValue(
                                    "customer_name",
                                    selectedCustomer.customer_name
                                );
                                setValue(
                                    "customer_phone_number",
                                    selectedCustomer.customer_phone_number || ""
                                );
                                setValue(
                                    "customer_email",
                                    selectedCustomer.customer_email || ""
                                );
                                setValue(
                                    "customer_address",
                                    selectedCustomer.customer_address || ""
                                );
                            }}
                            placeholder="مشتری را انتخاب کن"
                            searchPlaceholder="جستجوی مشتری..."
                        />
                        {errors.customer_id && (
                            <span className="text-red-500">
                                {errors.customer_id.message}
                            </span>
                        )}
                    </div>
                )}
            />
            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                    <Label htmlFor="customer_name">نام مشتری</Label>
                    <Input {...register("customer_name")} id="customer_name" />
                    {errors.customer_name && (
                        <span className="text-red-500">
                            {errors.customer_name.message}
                        </span>
                    )}
                </div>
                <div className="space-y-3">
                    <Label htmlFor="customer_phone_number">شماره تلفن</Label>
                    <Input
                        {...register("customer_phone_number")}
                        id="customer_phone_number"
                    />
                    {errors.customer_phone_number && (
                        <span className="text-red-500">
                            {errors.customer_phone_number.message}
                        </span>
                    )}
                </div>
                <div className="space-y-3">
                    <Label htmlFor="customer_email">ایمیل</Label>
                    <Input
                        {...register("customer_email")}
                        id="customer_email"
                        type="email"
                    />
                    {errors.customer_email && (
                        <span className="text-red-500">
                            {errors.customer_email.message}
                        </span>
                    )}
                </div>
                <div className="space-y-3">
                    <Label htmlFor="customer_address">آدرس</Label>
                    <Input
                        {...register("customer_address")}
                        id="customer_address"
                    />
                    {errors.customer_address && (
                        <span className="text-red-500">
                            {errors.customer_address.message}
                        </span>
                    )}
                </div>

                <div className="flex gap-5">
                    <div>
                        {/* Status */}
                        <div className="space-y-3">
                            <Label htmlFor="status">وضعیت پرداخت</Label>
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className=" text-right px-3 py-2 border rounded-md">
                                            <SelectValue placeholder="وضعیت پرداخت" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">
                                                در انتظار
                                            </SelectItem>
                                            <SelectItem value="paid">
                                                پرداخت شده
                                            </SelectItem>
                                            <SelectItem value="cancelled">
                                                لغو شده
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.status && (
                                <span className="text-red-500">
                                    {errors.status.message}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Payment Method */}
                    <div className="space-y-3">
                        <Label htmlFor="payment_mode">روش پرداخت</Label>
                        <Controller
                            control={control}
                            name="payment_mode"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="text-right px-3 py-2 border rounded-md">
                                        <SelectValue placeholder="روش پرداخت" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">
                                            نقد
                                        </SelectItem>
                                        <SelectItem value="card">
                                            کارت
                                        </SelectItem>
                                        <SelectItem value="bank">
                                            بانک
                                        </SelectItem>
                                        <SelectItem value="others">
                                            سایر
                                        </SelectItem>
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
                </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "در حال ساخت..." : "ساخت فاکتور"}
            </Button>
        </form>
    );
}
