import { PenIcon } from "lucide-react";
import num2persian from "num2persian";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type { Product, ProductCreate } from "@/features/products/types/product";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/features/shared/components/ui/dialog";

import { Button } from "../../shared/components/ui/button";
import { Field, FieldLabel } from "../../shared/components/ui/field";
import { Input } from "../../shared/components/ui/input";
import { Textarea } from "../../shared/components/ui/textarea";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

export default function EditProductModal({ product }: { product: Product }) {
    const [open, setOpen] = useState(false);
    const [pricePersian, setPricePersian] = useState("");
    const [buyPersian, setBuyPersian] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductCreate>({
        defaultValues: {
            description: product.description,
            price: product.price,
            buy: product.buy,
            stock_quantity:product.stock_quantity,
        },
    });

    const { mutateAsync: updateProduct, isPending } = useUpdateProduct();

    // مقداردهی اولیه قیمت‌ها به فارسی
    useEffect(() => {
        setPricePersian(num2persian(String(product.price)));
        setBuyPersian(num2persian(String(product.buy)));
    }, [product]);

    const onSubmit = async (data: ProductCreate) => {
        try {
            await updateProduct({ id: product.id, data });
            setOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <PenIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ویرایش کالا</DialogTitle>
                    <DialogDescription>
                        جهت ویرایش کالا فرم زیر را تکمیل کنید
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <p className="text-primary font-semibold text-2xl">
                        {product.name}
                    </p>
                    <Field>
                        <FieldLabel htmlFor="stock_quantity">موجودی</FieldLabel>
                        <Input
                            type="number"
                            id="stock_quantity"
                            placeholder="موجودی"
                            {...register("stock_quantity", {
                                required: "موجودی الزامی است",
                                min: { value: 1, message: "حداقل ۱" },
                            })}
                            
                        />
                        {errors.stock_quantity && (
                            <p className="text-red-500 text-sm">
                                {errors.stock_quantity.message}
                            </p>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="description">توضیحات</FieldLabel>
                        <Textarea
                            id="description"
                            placeholder="توضیحات"
                            {...register("description", {
                                minLength: {
                                    value: 2,
                                    message: "حداقل ۲ کاراکتر",
                                },
                                maxLength: {
                                    value: 300,
                                    message: "حداکثر ۳۰۰ کاراکتر",
                                },
                            })}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="price">قیمت فروش</FieldLabel>
                        <Input
                            type="number"
                            id="price"
                            placeholder="قیمت"
                            {...register("price", {
                                required: "قیمت الزامی است",
                                min: { value: 1, message: "حداقل ۱" },
                            })}
                            onChange={(e) => {
                                setPricePersian(num2persian(e.target.value));
                            }}
                        />
                        {pricePersian && <p>{pricePersian} تومان</p>}
                        {errors.price && (
                            <p className="text-red-500 text-sm">
                                {errors.price.message}
                            </p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="buy">قیمت خرید</FieldLabel>
                        <Input
                            type="number"
                            id="buy"
                            placeholder="قیمت خرید"
                            {...register("buy", {
                                required: "قیمت خرید الزامی است",
                                min: { value: 1, message: "حداقل ۱" },
                            })}
                            onChange={(e) => {
                                setBuyPersian(num2persian(e.target.value));
                            }}
                        />
                        {buyPersian && <p>{buyPersian} تومان</p>}
                        {errors.buy && (
                            <p className="text-red-500 text-sm">
                                {errors.buy.message}
                            </p>
                        )}
                    </Field>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full"
                    >
                        {isPending ? "در حال ارسال..." : "ویرایش کالا"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
