import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import type { User, UserCreate } from "@/types/user";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
export default function EditProfileModal({
    profile,
    setReload,
}: {
    profile: User;
    setReload: React.Dispatch<React.SetStateAction<number>>;
}) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UserCreate>({
        defaultValues: profile,
    });
    useEffect(() => {
        reset(profile);
    }, [profile]);
    const onSubmit = async (data: UserCreate) => {
        try {
            setLoading(true);
            setSuccess(false);
            await apiFetch("/account/profile/", {
                method: "PUT",
                body: JSON.stringify(data),
            });
            setSuccess(true);
            alert("پروفایل با موفقیت ویرایش شد");
            setReload((prev) => prev + 1);
            setOpen(false);
        } catch (err: any) {
            console.error(err);
            if (err?.non_field_errors?.length) {
                setError("root", {
                    type: "custom",
                    message: err.non_field_errors[0],
                });
            } else if (err?.detail) {
                setError("root", { type: "custom", message: err.detail });
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
        <>
            <Dialog onOpenChange={setOpen} open={open}>
                <DialogTrigger asChild onClick={() => setOpen(true)}>
                    <Button>ویرایش پروفایل</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>ویرایش پروفایل</DialogTitle>
                        <DialogDescription>
                            <span>ویرایش اطلاعات پروفایل</span>
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="first_name">نام</Label>
                            <Input
                                type="text"
                                id="first_name"
                                placeholder="نام"
                                {...register("first_name", {
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
                            <p className="text-red-500 text-sm">
                                {errors.first_name?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_name">نام خانوادگی</Label>
                            <Input
                                type="text"
                                id="last_name"
                                placeholder="نام خانوادگی"
                                {...register("last_name", {
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
                            <p className="text-red-500 text-sm">
                                {errors.last_name?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="store_name">نام فروشگاه</Label>
                            <Input
                                type="text"
                                id="store_name"
                                placeholder="نام فروشگاه"
                                {...register("store_name", {
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
                            <p className="text-red-500 text-sm">
                                {errors.store_name?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="store_description">
                                توضیحات فروشگاه
                            </Label>
                            <Textarea
                                id="store_description"
                                placeholder="توضیحات فروشگاه"
                                {...register("store_description", {
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
                            <p className="text-red-500 text-sm">
                                {errors.store_description?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="store_address">آدرس فروشگاه</Label>
                            <Input
                                type="text"
                                id="store_address"
                                placeholder="آدرس فروشگاه"
                                {...register("store_address", {
                                    minLength: {
                                        value: 2,
                                        message: "حداقل ۲ کاراکتر",
                                    },
                                    maxLength: {
                                        value: 150,
                                        message: "حداکثر ١٥٠ کاراکتر",
                                    },
                                })}
                            />
                            <p className="text-red-500 text-sm">
                                {errors.store_address?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="insta_link">لینک اینستاگرام</Label>
                            <Input
                                type="text"
                                id="insta_link"
                                placeholder="لینک اینستاگرام"
                                {...register("insta_link")}
                            />
                            <p className="text-red-500 text-sm">
                                {errors.insta_link?.message}
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading || isSubmitting}
                            className="w-full"
                        >
                            {loading ? "در حال ارسال..." : "ویرایش پروفایل"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
