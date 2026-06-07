import num2persian from "num2persian";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useCreateProduct } from "@/features/products/hooks/useCreateProduct";
import type { ProductCreate } from "@/features/products/types/product";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/features/shared/components/ui/dialog";

import { Button } from "../../shared/components/ui/button";
import { Input } from "../../shared/components/ui/input";
import { Textarea } from "../../shared/components/ui/textarea";
interface AddProductModalProps {
    disabled?: boolean;
}
export default function AddProductModal({
    disabled = false,
}: AddProductModalProps) {
    const [pricePersian, setPricePersian] = useState("");
    const [buyPersian, setBuyPersian] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ProductCreate>();
    const { createProduct, isCreating } = useCreateProduct();
    const onSubmit = async (data: ProductCreate) => {
        try {
            await createProduct(data);
            reset();
            setPricePersian("");
            setBuyPersian("");
        } catch (err: any) {
            console.error(err);

            if (err?.message?.length) {
                setError("root", {
                    type: "custom",
                    message: "نام کالا نباید تکراری باشد",
                });
            } else {
                setError("root", {
                    type: "custom",
                    message: "خطای ناشناخته‌ای رخ داد",
                });
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled}>افزودن کالا</Button>
            </DialogTrigger>
            <DialogContent className="font-vazir">
                <DialogHeader>
                    <DialogTitle>افزودن کالا</DialogTitle>
                    <DialogDescription>
                        جهت افزودن کالای جدید فرم زیر را تکمیل کنید
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <Input
                        type="text"
                        placeholder="نام کالا"
                        {...register("name", {
                            required: "نام کالا الزامی است",
                            minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
                            maxLength: {
                                value: 30,
                                message: "حداکثر ۳۰ کاراکتر",
                            },
                        })}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.name?.message}
                    </p>
                    <Input
                        type="number"
                        placeholder="موجودی"
                        {...register("stock_quantity", {
                            required: "موجودی الزامی است",
                            min: {
                                value: 1,
                                message: "حداقل موجودی یک عدد میباشد",
                            },
                        })}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.stock_quantity?.message}
                    </p>
                    <Textarea
                        placeholder="توضیحات"
                        {...register("description", {
                            minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
                            maxLength: {
                                value: 300,
                                message: "حداکثر ۳۰۰ کاراکتر",
                            },
                        })}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.description?.message}
                    </p>

                    <Input
                        type="number"
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
                    <p className="text-red-500 text-sm">
                        {errors.price?.message}
                    </p>
                    <Input
                        type="number"
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
                    <p className="text-red-500 text-sm">
                        {errors.buy?.message}
                    </p>
                    <Input
                        type="text"
                        placeholder="بارکد کالا"
                        {...register("barcode", {
                            minLength: {
                                value: 4,
                                message: "بارکد نامعتبر است",
                            },
                            maxLength: {
                                value: 64,
                                message: "بارکد خیلی طولانی است",
                            },
                        })}
                    />

                    <p className="text-red-500 text-sm">
                        {errors.barcode?.message}
                    </p>
                    <Button
                        type="submit"
                        disabled={isCreating || isSubmitting}
                        className="w-full"
                    >
                        {isCreating ? "در حال ارسال..." : "افزودن کالا"}
                    </Button>
                    <p className="text-red-500 text-sm">
                        {" "}
                        {errors.root?.message}
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}
