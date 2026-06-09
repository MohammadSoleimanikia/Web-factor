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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Product Name */}
                    <div className="space-y-1.5">
                        <Input
                            type="text"
                            placeholder="نام کالا"
                            className={errors.name ? "border-red-500" : ""}
                            {...register("name", {
                                required: "نام کالا الزامی است",
                                minLength: {
                                    value: 2,
                                    message: "حداقل ۲ کاراکتر",
                                },
                                maxLength: {
                                    value: 30,
                                    message: "حداکثر ۳۰ کاراکتر",
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs font-medium">
                                ⚠️ {errors.name.message}
                            </p>
                        )}
                    </div>
                    {/* Stock Quantity */}
                    <div className="space-y-1.5">
                        <Input
                            type="number"
                            placeholder="موجودی"
                            className={
                                errors.stock_quantity ? "border-red-500" : ""
                            }
                            {...register("stock_quantity", {
                                required: "موجودی الزامی است",
                                min: {
                                    value: 1,
                                    message: "حداقل موجودی یک عدد میباشد",
                                },
                            })}
                        />
                        {errors.stock_quantity && (
                            <p className="text-red-500 text-xs font-medium">
                                ⚠️ {errors.stock_quantity.message}
                            </p>
                        )}
                    </div>
                    {/* Description */}
                    <div className="space-y-1.5">
                        <Textarea
                            placeholder="توضیحات"
                            className={
                                errors.description ? "border-red-500" : ""
                            }
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
                            <p className="text-red-500 text-xs font-medium">
                                ⚠️ {errors.description.message}
                            </p>
                        )}
                    </div>
                    {/* Price & Buy Price Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Price */}
                        <div className="space-y-1.5">
                            <Input
                                type="number"
                                placeholder="قیمت فروش"
                                className={errors.price ? "border-red-500" : ""}
                                {...register("price", {
                                    required: "قیمت الزامی است",
                                    min: { value: 1, message: "حداقل ۱" },
                                })}
                                onChange={(e) => {
                                    setPricePersian(
                                        num2persian(e.target.value),
                                    );
                                }}
                            />
                            {pricePersian && (
                                <p className="text-green-600 text-xs font-medium">
                                    ✓ {pricePersian} تومان
                                </p>
                            )}
                            {errors.price && (
                                <p className="text-red-500 text-xs font-medium">
                                    ⚠️ {errors.price.message}
                                </p>
                            )}
                        </div>

                        {/* Buy Price */}
                        <div className="space-y-1.5">
                            <Input
                                type="number"
                                placeholder="قیمت خرید"
                                className={errors.buy ? "border-red-500" : ""}
                                {...register("buy", {
                                    required: "قیمت خرید الزامی است",
                                    min: { value: 1, message: "حداقل ۱" },
                                })}
                                onChange={(e) => {
                                    setBuyPersian(num2persian(e.target.value));
                                }}
                            />
                            {buyPersian && (
                                <p className="text-green-600 text-xs font-medium">
                                    ✓ {buyPersian} تومان
                                </p>
                            )}
                            {errors.buy && (
                                <p className="text-red-500 text-xs font-medium">
                                    ⚠️ {errors.buy.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Barcode */}
                    <div className="space-y-1.5">
                        <Input
                            type="text"
                            placeholder="بارکد کالا (اختیاری)"
                            className={errors.barcode ? "border-red-500" : ""}
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
                        {errors.barcode && (
                            <p className="text-red-500 text-xs font-medium">
                                ⚠️ {errors.barcode.message}
                            </p>
                        )}
                    </div>
                    {/* Global Error */}
                    {errors.root && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3">
                            <p className="text-red-700 text-sm font-medium">
                                {errors.root.message}
                            </p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isCreating || isSubmitting}
                        className="w-full mt-2"
                    >
                        {isCreating || isSubmitting ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                در حال ارسال...
                            </>
                        ) : (
                            "افزودن کالا"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
