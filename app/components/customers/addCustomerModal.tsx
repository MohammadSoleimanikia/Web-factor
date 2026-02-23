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
import type { CustomerCreate } from "@/types/customer";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import LoadingSpinner from "../ui/loadingSpinner";

export default function AddCustomerModal({
    onAdded,
}: {
    onAdded?: () => void;
}) {
    const [loading, setLoading] = useState(false);

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
            await apiFetch("/account/customers/", {
                method: "POST",
                body: JSON.stringify(data),
            });
            toast.success("مشتری با موفقیت افزوده شد");
            reset();
            onAdded?.();
        } catch (err: any) {
            console.log("BACKEND ERROR 👉", err);

            // اگر بک‌اند message فرستاد
            if (err?.message) {
                setError("root", {
                    type: "server",
                    message: err.message,
                });
                return;
            }

            setError("root", {
                type: "server",
                message: "خطایی رخ داد، لطفاً دوباره تلاش کنید",
            });
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
                        {...register("name", {
                            required: "نام مشتری الزامی است",
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
                        type="email"
                        placeholder="ایمیل مشتری"
                        {...register("email", {})}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.email?.message}
                    </p>

                    <Input
                        type="text"
                        placeholder="شماره تلفن مشتری"
                        {...register("phone_number", {
                            required: "شماره تلفن مشتری الزامی است",
                        })}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.phone_number?.message}
                    </p>
                    <Input
                        placeholder=" آدرس مشتری"
                        {...register("address", {})}
                    />
                    <p className="text-red-500 text-sm">
                        {errors.address?.message}
                    </p>
                    <Button
                        type="submit"
                        disabled={loading || isSubmitting}
                        className="w-full"
                    >
                        {loading ? (
                            <LoadingSpinner text="در حال ارسال..." />
                        ) : (
                            "افزودن مشتری"
                        )}
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
