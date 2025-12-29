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
import type { CustomerCreate } from "@/types/customer";
import { Input } from "../ui/input";
import { apiFetch } from "@/lib/api";
import { useState } from "react";

export default function AddCustomerModal({
    onAdded,
}: {
    onAdded?: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CustomerCreate>();

    const onSubmit = async (data: CustomerCreate) => {
        try {
            setLoading(true);
            setSuccess(false);
            await apiFetch("/account/customers/", {
                method: "POST",
                body: JSON.stringify(data),
            });
            setSuccess(true);
            reset();
            onAdded?.();
        } catch (err: any) {
            console.error(err);

            if (err?.non_field_errors?.length) {
                setError("root", {
                    type: "custom",
                    message: "نام یا شماره مشتری نباید تکراری باشد   ",
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
                <Button>افزودن مشتری</Button>
            </DialogTrigger>
            <DialogContent className="font-vazir">
                <DialogHeader>
                    <DialogTitle>افزودن مشتری</DialogTitle>
                    <DialogDescription>
                        جهت افزودن مشتری جدید فرم زیر را تکمیل کنید
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <Input
                        type="text"
                        placeholder="نام مشتری"
                        {...register("customer_name", {
                            required: "نام مشتری الزامی است",
                            minLength: { value: 2, message: "حداقل ۲ کاراکتر" },
                            maxLength: {
                                value: 30,
                                message: "حداکثر ۳۰ کاراکتر",
                            },
                        })}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.customer_name?.message}
                    </p>

                    <Input
                        type="text"
                        placeholder="ایمیل مشتری"
                        {...register("customer_email", {
                        })}
                        typeof="email"
                    />
                    <p className="text-red-500 text-sm">
                        {errors.customer_email?.message}
                    </p>

                    <Input
                        type="text"
                        placeholder="شماره تلفن مشتری"
                        {...register("customer_phone_number", {
                            required: "شماره تلفن مشتری الزامی است",
                        })}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.customer_phone_number?.message}
                    </p>
                    <Input
                        placeholder=" آدرس مشتری"
                        {...register("customer_address")}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.customer_address?.message}
                    </p>
                    <Button
                        type="submit"
                        disabled={loading || isSubmitting}
                        className="w-full"
                    >
                        {loading ? "در حال ارسال..." : "افزودن مشتری"}
                    </Button>
                    <p className="text-red-500 text-sm">
                        {" "}
                        {errors.root?.message}
                    </p>
                    {success && (
                        <p className="text-green-500 text-center mt-2">
                            مشتری با موفقیت اضافه شد!
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
