import { PenIcon } from "lucide-react";
import num2persian from "num2persian";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { apiFetch } from "@/lib/api";
import type { Product, ProductCreate } from "@/types/product";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export default function EditProductModal({
    onAdded,
    product,
}: {
    onAdded?: () => void;
    product: Product;
}) {
    const [loading, setLoading] = useState(false);
    const [pricePersian, setPricePersian] = useState("");
    const [buyPersian, setBuyPersian] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ProductCreate>();

    const onSubmit = async (data: ProductCreate) => {
        try {
            setLoading(true);
            await apiFetch(`/user/products/${product.id}/`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            toast.success("کالا با موفقیت ویرایش شد");
            reset();
            onAdded?.();
            setPricePersian("");
        } catch (err: any) {
            console.error(err);

            if (err?.non_field_errors?.length) {
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog>
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

                    <Textarea
                        placeholder="توضیحات"
                        defaultValue={product.description}
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
                        defaultValue={product.price}
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
                        defaultValue={product.buy}
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
                    <Button
                        type="submit"
                        disabled={loading || isSubmitting}
                        className="w-full"
                    >
                        {loading ? "در حال ارسال..." : "افزودن کالا"}
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
