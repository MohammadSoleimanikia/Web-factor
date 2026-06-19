// features/invoices/components/NewInvoiceForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import {
    type InvoiceFormType,
    InvoiceSchema,
} from "@/features/invoices/schema/invoice.schema";
import { useProducts } from "@/features/products/hooks/useProducts";
import { Button } from "@/features/shared/components/ui/button";
import { Input } from "@/features/shared/components/ui/input";
import { Label } from "@/features/shared/components/ui/label";
import { Separator } from "@/features/shared/components/ui/separator";
import { Textarea } from "@/features/shared/components/ui/textarea";

import LoadingSpinner from "../../shared/components/ui/loadingSpinner";
import { useCreateInvoice } from "../hooks/useCreateInvoice";
import CustomerComboBox from "./invoiceForm/customerComboBox";
import CustomerDetailsFields from "./invoiceForm/customerDetailsFields";
import InvoiceStatusSelect from "./invoiceForm/invoiceStatusSelect";
import ItemsTable from "./invoiceForm/itemsTable";
import InvoicePaymentMethodSelect from "./invoiceForm/paymentMethodSelect";
import ProductBarcodeInput from "./invoiceForm/productBarcodeInput";
import ProductMultiSelect from "./invoiceForm/productMultiSelect";
import VatAndDiscountSection from "./invoiceForm/vatAndDiscountSection";

export default function NewInvoiceForm() {
    const navigate = useNavigate();
    const [vatEnabled, setVatEnabled] = useState(false);

    const methods = useForm<InvoiceFormType>({
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
            title: "فاکتور فروش",
            added_value: 0,
            discount: 0,
        },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = methods;
    const { mutateAsync: createInvoice, isPending } = useCreateInvoice();
    // make page size high cause we want to search into all of the products and customers
    const { products } = useProducts({ pageSize: 1000 });
    const { data, isLoading } = useCustomers({ pageSize: 1000 });
    const customers = data?.results;
    const watchedItems = watch("items");
    const addedValue = watch("added_value");

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

        setValue("added_value", Math.floor(totalPrice * 0.1));
    }, [vatEnabled, watchedItems, setValue]);

    const handleProductAdd = (product: any) => {
        const existing = watchedItems.find((i) => i.product_id === product.id);
        if (existing) {
            toast("محصول قبلا اضافه شده", { icon: "⚠️" });
            return;
        }
        setValue("items", [
            ...watchedItems,
            { product_id: product.id, quantity: 1, price: product.price },
        ]);
        toast.success(`${product.name} اضافه شد`);
    };

    const onSubmit = async (data: InvoiceFormType) => {
        try {
            await createInvoice(data);
        } catch (error) {
            console.error("error:", error);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    // اگر محصولی وجود نداشت، پیام مناسب با دکمه رفتن به صفحه محصولات
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Package className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                    کالایی برای ایجاد فاکتور ندارید
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                    لطفاً ابتدا محصولات خود را اضافه کنید، سپس فاکتور خود را ثبت
                    نمایید
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
                {/* بخش: اطلاعات فاکتور */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">اطلاعات فاکتور</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium">
                                عنوان فاکتور <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                {...register("title")}
                                placeholder="مثال: فاکتور فروش فروردین"
                            />
                            {errors.title && (
                                <span className="text-red-500 text-sm">
                                    {errors.title.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <Separator />

                {/* بخش: انتخاب کالاها */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">انتخاب کالاها</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ProductMultiSelect products={products} />
                        <ProductBarcodeInput
                            products={products}
                            onProductAdd={handleProductAdd}
                        />
                    </div>
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
                                        کالاهای انتخاب شده
                                    </h2>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {watchedItems.length} کالا
                                </span>
                            </div>
                            <ItemsTable products={products} />
                        </div>
                    </>
                )}

                <Separator />

                {/* بخش: اطلاعات مشتری */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">اطلاعات مشتری</h2>
                    </div>
                    <CustomerComboBox customers={customers} />
                    <CustomerDetailsFields />
                </div>

                <Separator />

                {/* بخش: توضیحات */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">توضیحات</h2>
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            {...register("descriptions")}
                            id="descriptions"
                            placeholder="توضیحات اضافی برای فاکتور (اختیاری)"
                            rows={3}
                        />
                        {errors.descriptions && (
                            <span className="text-red-500 text-sm">
                                {errors.descriptions.message}
                            </span>
                        )}
                    </div>
                </div>

                <Separator />

                {/* بخش: وضعیت و روش پرداخت */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">وضعیت و روش پرداخت</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InvoiceStatusSelect />
                        <InvoicePaymentMethodSelect />
                    </div>
                </div>

                <Separator />

                {/* بخش: ارزش افزوده و تخفیف */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-1 rounded-full bg-primary" />
                        <h2 className="text-lg font-semibold">ارزش افزوده و تخفیف</h2>
                    </div>
                    <VatAndDiscountSection
                        vatEnabled={vatEnabled}
                        onVatToggle={setVatEnabled}
                        addedValue={addedValue}
                    />
                </div>

                {/* دکمه ارسال */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(-1)}
                    >
                        انصراف
                    </Button>
                    <Button type="submit" disabled={isPending} className="min-w-32">
                        {isPending ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                در حال ساخت...
                            </>
                        ) : (
                            "ساخت فاکتور"
                        )}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}