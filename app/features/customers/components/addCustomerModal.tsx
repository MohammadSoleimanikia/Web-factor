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
} from "@/features/shared/components/ui/dialog";

import { Button } from "../../shared/components/ui/button";
import { Input } from "../../shared/components/ui/input";
import LoadingSpinner from "../../shared/components/ui/loadingSpinner";
import { useCreateCustomer } from "../hooks/useCreateCustomer";
import type { CustomerCreate } from "../types/customer";
export default function AddCustomerModal() {
    // refetch after adding a new customers.
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<CustomerCreate>();
    const { mutateAsync: createCustomer, isPending } = useCreateCustomer();
    const onSubmit = async (data: CustomerCreate) => {
        try {
            await createCustomer(data);
            toast.success("مشتری با موفقیت افزوده شد");
            reset();
            setOpen(false);
        } catch (err: any) {
            console.log("BACKEND ERROR 👉", err);

            if (err?.message) {
                setError("root", {
                    type: "server",
                    message: err.message,
                });
            } else {
                setError("root", {
                    type: "server",
                    message: "خطایی رخ داد، لطفاً دوباره تلاش کنید",
                });
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                        type="number"
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
                        disabled={isPending}
                        className="w-full"
                    >
                        {isPending ? (
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
