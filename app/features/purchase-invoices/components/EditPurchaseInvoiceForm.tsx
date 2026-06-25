// app/features/purchase-invoices/components/EditPurchaseInvoiceForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { useProducts } from "@/features/products/hooks/useProducts";
import type { Product } from "@/features/products/types/product";
import { Button } from "@/features/shared/components/ui/button";
import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";
import { Separator } from "@/features/shared/components/ui/separator";
import { Textarea } from "@/features/shared/components/ui/textarea";

import { usePurchaseInvoice } from "../hooks/usePurchaseInvoice";
import { useUpdatePurchaseInvoice } from "../hooks/useUpdatePurchaseInvoice";
import {
    normalizePurchaseInvoicePayload,
    type PurchaseInvoiceFormType,
    PurchaseInvoiceSchema,
} from "../schema/purchaseInvoice.schema";
import PurchaseDatePicker from "./purchaseInvoiceForm/PurchaseDatePicker";
import PurchaseItemsTable from "./purchaseInvoiceForm/PurchaseItemsTable";
import PurchaseProductBarcodeInput from "./purchaseInvoiceForm/PurchaseProductBarcodeInput";
import PurchaseProductMultiSelect from "./purchaseInvoiceForm/PurchaseProductMultiSelect";
import PurchaseVatAndDiscountSection from "./purchaseInvoiceForm/PurchaseVatAndDiscountSection";

type EditPurchaseInvoiceFormProps = {
    id: string;
};

type ProductWithPurchasePrice = Product & {
    last_buy_price?: number | null;
    price?: number | null;
};

function getTodayDateInputValue() {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60 * 1000;

    return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);
}

function getDateInputValue(date?: string | null) {
    if (!date) return getTodayDateInputValue();

    return date.slice(0, 10);
}

function getDefaultUnitCost(product: Product) {
    const purchaseProduct = product as ProductWithPurchasePrice;

    return Number(purchaseProduct.last_buy_price ?? purchaseProduct.price ?? 0);
}

export default function EditPurchaseInvoiceForm({
    id,
}: EditPurchaseInvoiceFormProps) {
    const navigate = useNavigate();
    const [vatEnabled, setVatEnabled] = useState(false);

    const methods = useForm<PurchaseInvoiceFormType>({
        resolver: zodResolver(PurchaseInvoiceSchema),
        defaultValues: {
            supplier_name: "",
            supplier_phone: "",
            supplier_email: "",
            supplier_address: "",
            invoice_number: "",
            items: [],
            status: "pending",
            discount: 0,
            added_value: 0,
            purchased_time: getTodayDateInputValue(),
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = methods;

    const { products = [], isLoading: productsLoading } = useProducts({
        pageSize: 1000,
    });

    const { data: invoice, isLoading: invoiceLoading } = usePurchaseInvoice(id);

    const { mutateAsync: updateInvoice, isPending } =
        useUpdatePurchaseInvoice();

    const watchedItems = watch("items") ?? [];
    const addedValue = Number(watch("added_value")) || 0;

    useEffect(() => {
        if (!invoice) return;

        reset({
            supplier_name: invoice.supplier_name ?? "",
            supplier_phone: invoice.supplier_phone ?? "",
            supplier_email: invoice.supplier_email ?? "",
            supplier_address: invoice.supplier_address ?? "",
            invoice_number: invoice.invoice_number ?? "",
            status: invoice.status ?? "pending",
            discount: invoice.discount ?? 0,
            added_value: invoice.added_value ?? 0,
            purchased_time: getDateInputValue(invoice.purchased_time),
            items:
                invoice.items?.map((item) => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                    unit_cost: item.unit_cost,
                })) ?? [],
        });

        setVatEnabled(Number(invoice.added_value ?? 0) > 0);
    }, [invoice, reset]);

    useEffect(() => {
        if (!vatEnabled) {
            setValue("added_value", 0, {
                shouldValidate: true,
                shouldDirty: true,
            });
            return;
        }

        const subtotal = watchedItems.reduce((sum, item) => {
            const quantity = Number(item.quantity) || 0;
            const unitCost = Number(item.unit_cost) || 0;

            return sum + quantity * unitCost;
        }, 0);

        setValue("added_value", Math.floor(subtotal * 0.1), {
            shouldValidate: true,
            shouldDirty: true,
        });
    }, [vatEnabled, watchedItems, setValue]);

    const handleProductAdd = (product: Product) => {
        const existing = watchedItems.find(
            (item) => item.product_id === product.id,
        );

        if (existing) {
            toast("محصول قبلاً اضافه شده", { icon: "⚠️" });
            return;
        }

        setValue(
            "items",
            [
                ...watchedItems,
                {
                    product_id: product.id,
                    quantity: 1,
                    unit_cost: getDefaultUnitCost(product),
                },
            ],
            {
                shouldValidate: true,
                shouldDirty: true,
            },
        );

        toast.success(`${product.name} اضافه شد`);
    };

    const onSubmit = async (data: PurchaseInvoiceFormType) => {
        try {
            await updateInvoice({
                id,
                data: normalizePurchaseInvoicePayload(data),
            });

            navigate("/purchase-invoices");
        } catch (error) {
            console.error(error);
            toast.error("خطا در ویرایش فاکتور خرید");
        }
    };

    if (productsLoading || invoiceLoading) {
        return <LoadingSpinner />;
    }

    if (!invoice) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">فاکتور خرید یافت نشد</p>

                <Button
                    onClick={() => navigate("/purchase-invoices")}
                    className="mt-4"
                >
                    بازگشت به لیست
                </Button>
            </div>
        );
    }

    if (invoice.status !== "pending") {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">این فاکتور قابل ویرایش نیست</p>

                <Button
                    onClick={() => navigate("/purchase-invoices")}
                    className="mt-4"
                >
                    بازگشت به لیست
                </Button>
            </div>
        );
    }

    if (products.length === 0 && watchedItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Package className="w-10 h-10 text-muted-foreground" />
                </div>

                <h3 className="text-lg font-semibold mb-2">
                    کالایی برای ویرایش فاکتور خرید ندارید
                </h3>

                <p className="text-muted-foreground max-w-sm mb-6">
                    لطفاً ابتدا کالاهای خود را اضافه کنید.
                </p>

                <div className="flex gap-3">
                    <Link to="/products">
                        <Button variant="default">رفتن به صفحه کالاها</Button>
                    </Link>

                    <Button variant="outline" onClick={() => navigate(-1)}>
                        بازگشت
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* اطلاعات فاکتور خرید */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">
                            اطلاعات فاکتور خرید
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="invoice_number">شماره فاکتور</Label>
                            <Input
                                id="invoice_number"
                                {...register("invoice_number")}
                                placeholder="شماره فاکتور تأمین‌کننده"
                            />
                            {errors.invoice_number && (
                                <span className="text-red-500 text-sm">
                                    {errors.invoice_number.message}
                                </span>
                            )}
                        </div>

                        <PurchaseDatePicker />

                        <div className="space-y-2">
                            <Label htmlFor="status_display">وضعیت</Label>
                            <Input
                                id="status_display"
                                value="در انتظار"
                                disabled
                                readOnly
                            />
                        </div>
                    </div>
                </div>

                <Separator />

                {/* انتخاب کالاها */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">انتخاب کالاها</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <PurchaseProductMultiSelect products={products} />

                        <PurchaseProductBarcodeInput
                            products={products}
                            onProductAdd={handleProductAdd}
                        />
                    </div>

                    {errors.items?.message && (
                        <span className="text-red-500 text-sm">
                            {errors.items.message}
                        </span>
                    )}
                </div>

                {/* جدول کالاها */}
                {watchedItems.length > 0 && (
                    <>
                        <Separator />

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-1 rounded-full bg-primary" />
                                    <h2 className="text-lg font-semibold">
                                        کالاهای خریداری‌شده
                                    </h2>
                                </div>

                                <span className="text-sm text-muted-foreground">
                                    {watchedItems.length} کالا
                                </span>
                            </div>

                            <PurchaseItemsTable products={products} />
                        </div>
                    </>
                )}

                <Separator />

                {/* اطلاعات تأمین‌کننده */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">
                            اطلاعات تأمین‌کننده
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="supplier_name">
                                نام تأمین‌کننده{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="supplier_name"
                                {...register("supplier_name")}
                                placeholder="نام تأمین‌کننده را وارد کنید"
                            />
                            {errors.supplier_name && (
                                <span className="text-red-500 text-sm">
                                    {errors.supplier_name.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="supplier_phone">
                                شماره تلفن{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="supplier_phone"
                                {...register("supplier_phone")}
                                placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                            />
                            {errors.supplier_phone && (
                                <span className="text-red-500 text-sm">
                                    {errors.supplier_phone.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="supplier_email">ایمیل</Label>
                            <Input
                                id="supplier_email"
                                type="email"
                                {...register("supplier_email")}
                                placeholder="example@email.com"
                            />
                            {errors.supplier_email && (
                                <span className="text-red-500 text-sm">
                                    {errors.supplier_email.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="supplier_address">آدرس</Label>
                            <Textarea
                                id="supplier_address"
                                {...register("supplier_address")}
                                placeholder="آدرس تأمین‌کننده"
                                rows={3}
                            />
                            {errors.supplier_address && (
                                <span className="text-red-500 text-sm">
                                    {errors.supplier_address.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <Separator />

                {/* ارزش افزوده و تخفیف */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">
                            ارزش افزوده و تخفیف
                        </h2>
                    </div>

                    <PurchaseVatAndDiscountSection
                        vatEnabled={vatEnabled}
                        onVatToggle={setVatEnabled}
                        addedValue={addedValue}
                    />
                </div>

                {/* دکمه‌ها */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                    >
                        انصراف
                    </Button>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="min-w-36"
                    >
                        {isPending ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                در حال ویرایش...
                            </>
                        ) : (
                            "ویرایش فاکتور خرید"
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
