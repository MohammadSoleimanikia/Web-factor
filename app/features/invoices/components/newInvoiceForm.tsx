import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Invoice } from "@/features/invoices/types/invoicePreview.type";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useInvoiceData } from "@/hooks/useInvoiceData";
import { apiFetch } from "@/lib/api";
import { type InvoiceFormType, InvoiceSchema } from "@/schemas/invoice.schema";

import { Combobox } from "../../../components/ui/comboBox";
import LoadingSpinner from "../../../components/ui/loadingSpinner";
import { Switch } from "../../../components/ui/switch";

export default function NewInvoiceForm({ invoiceID }: { invoiceID?: string }) {
    const [vatEnabled, setVatEnabled] = useState(false);
    const isEdit = Boolean(invoiceID);
    const Navigate = useNavigate();
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        watch,
        setValue,
    } = useForm<InvoiceFormType>({
        resolver: zodResolver(InvoiceSchema),
        defaultValues: {
            items: [],
            customer_name: "",
            customer_phone_number: "",
            customer_email: "",
            customer_address: "",
            status: "pending",
            payment_mode: "cash",
            descriptions: "",
            title: "",
            added_value: 0,
            discount: 0,
        },
    });
    const { products } = useProducts({});
    const { customers, isLoading } = useInvoiceData({
        invoiceID,
        reset,
    });
    const watchedItems = watch("items");
    const addedValue = watch("added_value");
    const customerOptions = customers.map((c) => ({
        value: c.name,
        id: c.id,
    }));

    // Fetch all data

    // calculate VAT
    useEffect(() => {
        if (!vatEnabled) {
            setValue("added_value", 0);
            return;
        }

        const totalPrice = watchedItems.reduce((sum, item) => {
            const price = Number(item.price) || 0;
            const qty = Number(item.quantity) || 0;
            return sum + price * qty;
        }, 0);

        setValue("added_value", Math.floor(totalPrice * 0.1)); //10%
    }, [vatEnabled, watchedItems, setValue]);
    const onSubmit = async (data: InvoiceFormType) => {
        try {
            const response = await apiFetch<Invoice>(
                isEdit ? `/user/invoices/${invoiceID}/` : "/user/invoices/",
                {
                    method: isEdit ? "PATCH" : "POST",
                    body: JSON.stringify(data),
                },
            );

            toast.success(
                isEdit
                    ? "فاکتور با موفقیت ویرایش شد!"
                    : "فاکتور با موفقیت ساخته شد!",
            );

            // After success, navigate to invoice detail/preview page
            Navigate(`/invoices/${response.id}`);
        } catch (error) {
            console.error("error:", error);
            toast.error(
                invoiceID
                    ? "خطا در ویرایش فاکتور. لطفا دوباره تلاش کنید."
                    : "خطا در ساخت فاکتور. لطفا دوباره تلاش کنید.",
            );
        }
    };
    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Selection */}
            {!isEdit && (
                <>
                    <div className="space-y-3 ">
                        <Label htmlFor="title">عنوان فاکتور</Label>
                        <Input {...register("title")} id="title" />
                        {errors.title && (
                            <span className="text-red-500">
                                {errors.title.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 sm:w-6/12">
                        <Label htmlFor="barcode">انتخاب کالا با بارکد</Label>
                        <Input
                            autoFocus={true}
                            type="text"
                            id="barcode"
                            placeholder="بارکد رو وارد کن"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    const barcode =
                                        e.currentTarget.value.trim();
                                    if (!barcode) return;

                                    const product = products.find(
                                        (p) => p.barcode === barcode,
                                    );
                                    if (!product) {
                                        toast.error(
                                            "محصولی با این بارکد پیدا نشد",
                                        );
                                        return;
                                    }

                                    // چک کنیم محصول قبلا اضافه نشده باشه
                                    const existing = watchedItems.find(
                                        (i) => i.product_id === product.id,
                                    );
                                    if (existing) {
                                        toast("محصول قبلا اضافه شده", {
                                            icon: "⚠️",
                                        });
                                        return;
                                    }

                                    // اضافه کردن محصول به فرم
                                    setValue("items", [
                                        ...watchedItems,
                                        {
                                            product_id: product.id,
                                            quantity: 1,
                                            price: product.price,
                                        },
                                    ]);

                                    e.currentTarget.value = ""; // ریست input
                                    toast.success(`${product.name} اضافه شد`);
                                }
                            }}
                        />
                    </div>

                    <Controller
                        control={control}
                        name="items"
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <Label>انتخاب با نام کالا</Label>
                                <MultiSelect
                                    values={field.value.map((item) =>
                                        String(item.product_id),
                                    )}
                                    onValuesChange={(vals) => {
                                        const newItems = vals.map((val) => {
                                            const existing = field.value.find(
                                                (i) =>
                                                    i.product_id ===
                                                    Number(val),
                                            );
                                            if (existing) return existing;
                                            const product = products.find(
                                                (p) => p.id === Number(val),
                                            );
                                            return {
                                                product_id: Number(val),
                                                quantity: 1,
                                                price: product?.price ?? 0,
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
                </>
            )}
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
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target
                                                                    .valueAsNumber,
                                                            )
                                                        }
                                                    />
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
                                            <Controller
                                                control={control}
                                                name={`items.${index}.price`}
                                                render={({ field }) => (
                                                    <Input
                                                        {...field}
                                                        disabled={isEdit}
                                                        type="number"
                                                        min={0}
                                                        step="1"
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                e.target
                                                                    .valueAsNumber,
                                                            )
                                                        }
                                                    />
                                                )}
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
                name="id"
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
                                          (c) => c.id === field.value,
                                      )?.name
                                    : undefined
                            }
                            onChange={(val) => {
                                const selectedCustomer = customers.find(
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
                        {errors.id && (
                            <span className="text-red-500">
                                {errors.id.message}
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
            </div>

            <div className="space-y-3 ">
                <Label htmlFor="descriptions">توضیحات</Label>
                <Input {...register("descriptions")} id="descriptions" />
                {errors.descriptions && (
                    <span className="text-red-500">
                        {errors.descriptions.message}
                    </span>
                )}
            </div>
            <div className="flex gap-5">
                <div>
                    {/* Status */}
                    <div className="space-y-3 ">
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
            </div>
            <div className="grid grid-cols-2 gap-4">
                {/* ارزش افزوده */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={vatEnabled}
                            onCheckedChange={setVatEnabled}
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

                {/* تخفیف */}
                <div className="flex flex-col">
                    <Label htmlFor="discount">تخفیف</Label>
                    <Controller
                        control={control}
                        name="discount"
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="number"
                                min={0}
                                step={1}
                                onChange={(e) =>
                                    field.onChange(e.target.valueAsNumber)
                                }
                            />
                        )}
                    />
                </div>
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                    ? "در حال ساخت..."
                    : isEdit
                      ? "ویرایش فاکتور"
                      : "ساخت فاکتور"}
            </Button>
        </form>
    );
}
