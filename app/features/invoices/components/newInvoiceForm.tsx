import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
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
            title: "",
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
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* عنوان فاکتور */}
                <div className="space-y-3">
                    <Label htmlFor="title">عنوان فاکتور</Label>
                    <Input {...register("title")} id="title" />
                    {errors.title && (
                        <span className="text-red-500">
                            {errors.title.message}
                        </span>
                    )}
                </div>

                {/* انتخاب محصولات */}
                <div className="space-y-6 grid sm:grid-cols-2 gap-4">
                    <ProductBarcodeInput
                        products={products}
                        onProductAdd={handleProductAdd}
                    />
                    <ProductMultiSelect products={products} />
                </div>

                {/* جدول محصولات */}
                {watchedItems.length > 0 && <ItemsTable products={products} />}

                {/* اطلاعات مشتری */}
                <CustomerComboBox customers={customers} />
                <CustomerDetailsFields />

                {/* توضیحات */}
                <div className="space-y-3">
                    <Label htmlFor="descriptions">توضیحات</Label>
                    <Input {...register("descriptions")} id="descriptions" />
                    {errors.descriptions && (
                        <span className="text-red-500">
                            {errors.descriptions.message}
                        </span>
                    )}
                </div>

                {/* وضعیت و روش پرداخت */}
                <div className="flex gap-5">
                    <InvoiceStatusSelect />
                    <InvoicePaymentMethodSelect />
                </div>

                {/* ارزش افزوده و تخفیف */}
                <VatAndDiscountSection
                    vatEnabled={vatEnabled}
                    onVatToggle={setVatEnabled}
                    addedValue={addedValue}
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? "در حال ساخت..." : "ساخت فاکتور"}
                </Button>
            </form>
        </FormProvider>
    );
}
