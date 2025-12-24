import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import type { ProductCreate } from "@/types/product";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { apiFetch } from "@/lib/api";
import num2persian from "num2persian";
import { useState } from "react";

export default function AddProductModal({ onAdded }: { onAdded?: () => void }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] =useState(false);
    const [numPersian, setNumPersian] =useState("");

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
            setSuccess(false);
            await apiFetch("/user/products/", {
                method: "POST",
                body: JSON.stringify(data),
            });
            setSuccess(true);
            reset();
            onAdded?.();
            setNumPersian("");
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
                <Button>افزودن کالا</Button>
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
                            setNumPersian(num2persian(e.target.value));
                        }}
                    />
                    {numPersian && <p>{numPersian} تومان</p>}
                    <p className="text-red-500 text-sm">
                        {errors.price?.message}
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
                    {success && (
                        <p className="text-green-500 text-center mt-2">
                            محصول با موفقیت اضافه شد!
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
