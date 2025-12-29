import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import type { User, UserUpdate } from "@/types/user";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { apiFetch } from "@/lib/api";
import { getStoredToken } from "@/lib/authStorage";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
export default function EditProfileModal({
    profile,
    setReload,
}: {
    profile: User;
    setReload: React.Dispatch<React.SetStateAction<number>>;
}) {
    // max size of logo file
    const MAX_SIZE = 25 * 1024; // 25KB
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UserUpdate>({
        defaultValues: {
            first_name: profile.first_name,
            last_name: profile.last_name,
            store_name: profile.profile.store_name,
            store_description: profile.profile.store_description,
            store_address: profile.profile.store_address,
            insta_link: profile.profile.insta_link,
            hexcolor: profile.profile.hexcolor,
        },
    });
    useEffect(() => {
        reset({
            first_name: profile.first_name,
            last_name: profile.last_name,
            store_name: profile.profile.store_name,
            store_description: profile.profile.store_description,
            store_address: profile.profile.store_address,
            insta_link: profile.profile.insta_link,
            hexcolor: profile.profile.hexcolor,
        });
        setLogoFile(null);
    }, [profile]);
    const onSubmit = async (data: UserUpdate) => {
        try {
            setLoading(true);
            setSuccess(false);
            const formData = new FormData();
            if (data.first_name !== undefined)
                formData.append("first_name", data.first_name);
            if (data.last_name !== undefined)
                formData.append("last_name", data.last_name);
            
            if (data.store_name != null)
                formData.append("store_name", data.store_name);
            if (data.store_description != null)
                formData.append("store_description", data.store_description);
            if (data.store_address != null)
                formData.append("store_address", data.store_address);
            if (data.insta_link != null)
                formData.append("insta_link", data.insta_link);
            if (data.hexcolor !== undefined)
                formData.append("hexcolor", data.hexcolor);
            if (logoFile !== null) {
                formData.append("logo", logoFile);
            }
            const token = getStoredToken();
            const headers: Record<string, string> = {};
            if (token?.access) {
                headers.Authorization = `Bearer ${token.access}`;
            }

            const response = await fetch(
                "https://invociemanager-production.up.railway.app/account/profile/",
                {
                    method: "PATCH",
                    headers,
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }
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
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>ویرایش پروفایل</DialogTitle>
                        <DialogDescription>
                            <span>ویرایش اطلاعات پروفایل</span>
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5 grid grid-cols-2 gap-x-4"
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
                            <Label htmlFor="store_name">
                                نام فروشگاه
                            </Label>
                            <Input
                                type="text"
                                id="store_name"
                                placeholder="نام فروشگاه"
                                {...register("store_name", {
                                    maxLength: {
                                        value: 50,
                                        message: "حداکثر ۵۰ کاراکتر",
                                    },
                                })}
                            />
                            <p className="text-red-500 text-sm">
                                {errors?.store_name?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="store_description">
                                توضیحات فروشگاه
                            </Label>
                            <Textarea
                                id="store_description"
                                placeholder="توضیحات فروشگاه"
                                {...register("store_description")}
                            />
                            <p className="text-red-500 text-sm">
                                {errors?.store_description?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="store_address">
                                آدرس فروشگاه
                            </Label>
                            <Input
                                type="text"
                                id="store_address"
                                placeholder="آدرس فروشگاه"
                                {...register("store_address", {
                                    maxLength: {
                                        value: 255,
                                        message: "حداکثر ۲۵۵ کاراکتر",
                                    },
                                })}
                            />
                            <p className="text-red-500 text-sm">
                                {errors?.store_address?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="insta_link">
                                لینک اینستاگرام
                            </Label>
                            <Input
                                type="text"
                                id="insta_link"
                                placeholder="لینک اینستاگرام"
                                {...register("insta_link", {
                                    maxLength: {
                                        value: 100,
                                        message: "حداکثر ۱۰۰ کاراکتر",
                                    },
                                })}
                            />
                            <p className="text-red-500 text-sm">
                                {errors?.insta_link?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profile.hexcolor">رنگ برند</Label>
                            <Input
                                type="color"
                                id="profile.hexcolor"
                                {...register("hexcolor")}
                            />
                            <p className="text-red-500 text-sm">
                                {errors?.hexcolor?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="profile.logo">لوگو</Label>
                            <Input
                                type="file"
                                id="profile.logo"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (!file) return;

                                    if (file.size > MAX_SIZE) {
                                        alert(
                                            "حجم فایل باید کمتر از 25 باشد"
                                        );
                                        e.target.value = ""; // ریست input
                                        setLogoFile(null);
                                        return;
                                    }

                                    setLogoFile(file);
                                }}
                            />
                            <p className="text-red-500 text-sm">
                                {errors?.logo?.message}
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
