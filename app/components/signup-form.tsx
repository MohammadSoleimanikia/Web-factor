import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

import { useForm, type SubmitHandler } from "react-hook-form";
// zod for validation
import { z } from "zod";
import { SignupSchema, type SignupFormType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupUser } from "@/lib/api";

import { useAuth } from "@/store/auth";
import { useNavigate } from "react-router";
export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormType>({
        resolver: zodResolver(SignupSchema),
    });

    const { logIn } = useAuth();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
        try {
            // use API to submit form data
            const result = await signupUser(data);
            // throw new Error("Submission failed");
            console.log("User Created:", result);
            alert("ثبت‌نام با موفقیت انجام شد 🎉");
            logIn(result);
            navigate("/dashboard");

            

        } catch (error) {
            //set error from API response
            const errorMessage = error instanceof Object && "detail" in error 
                ? (error as Record<string, string>).detail 
                : "مشکلی پیش آمده است";
            setError("root", { message: errorMessage });
            console.log(error);
        }
    };
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form
                        className="p-6 md:p-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    ایجاد حساب
                                </h1>
                            </div>

                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="name">
                                            نام
                                        </FieldLabel>
                                        <Input
                                            {...register("name")}
                                            id="name"
                                            type="text"
                                            required
                                        />
                                        {errors.name && (
                                            <span className="text-red-500">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            ایمیل
                                        </FieldLabel>
                                        <Input
                                            {...register("email")}
                                            id="email"
                                            type="email"
                                            required
                                        />
                                        {errors.email && (
                                            <span className="text-red-500">
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </Field>
                                </Field>

                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="storeName">
                                            نام فروشگاه
                                        </FieldLabel>
                                        <Input
                                            {...register("store_name")}
                                            id="storeName"
                                            type="text"
                                            required
                                        />
                                        {errors.store_name && (
                                            <span className="text-red-500">
                                                {errors.store_name.message}
                                            </span>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="phone_number">
                                            تلفن
                                        </FieldLabel>
                                        <Input
                                            {...register("phone_number")}
                                            id="phone_number"
                                            type="tel"
                                            required
                                        />
                                        {errors.phone_number && (
                                            <span className="text-red-500">
                                                {errors.phone_number.message}
                                            </span>
                                        )}
                                    </Field>
                                </Field>
                            </Field>

                            <Field className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="insta_link">
                                        لینک اینستاگرام
                                    </FieldLabel>
                                    <Input
                                        {...register("insta_link")}
                                        id="insta_link"
                                        type="text"
                                        required
                                    />
                                    {errors.insta_link && (
                                        <span className="text-red-500">
                                            {errors.insta_link.message}
                                        </span>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="store_description">
                                        توضیحات فروشگاه
                                    </FieldLabel>
                                    <Input
                                        {...register("store_description")}
                                        id="store_description"
                                        type="text"
                                        required
                                    />
                                    {errors.store_description && (
                                        <span className="text-red-500">
                                            {errors.store_description.message}
                                        </span>
                                    )}
                                </Field>
                            </Field>

                            <Field>
                                <Field>
                                    <FieldLabel htmlFor="store_address">
                                        آدرس فروشگاه
                                    </FieldLabel>
                                    <Input
                                        {...register("store_address")}
                                        id="store_address"
                                        type="text"
                                        required
                                    />
                                    {errors.store_address && (
                                        <span className="text-red-500">
                                            {errors.store_address.message}
                                        </span>
                                    )}
                                </Field>
                            </Field>
                            <Field className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="password">
                                        کلمه عبور
                                    </FieldLabel>
                                    <Input
                                        {...register("password")}
                                        id="password"
                                        type="password"
                                        required
                                    />
                                    {errors.password && (
                                        <span className="text-red-500">
                                            {errors.password.message}
                                        </span>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="confirm-password">
                                        تائید کلمه عبور
                                    </FieldLabel>
                                    <Input
                                        {...register("confirmPassword")}
                                        id="confirm-password"
                                        type="password"
                                        required
                                    />
                                    {errors.confirmPassword && (
                                        <span className="text-red-500">
                                            {errors.confirmPassword.message}
                                        </span>
                                    )}
                                </Field>
                            </Field>

                            <Field>
                                <Button disabled={isSubmitting} type="submit">
                                    {isSubmitting ? (
                                        <span>در حال ارسال...</span>
                                    ) : (
                                        "ایجاد حساب"
                                    )}
                                </Button>
                                {errors.root && (
                                    <span className="text-red-500">
                                        {errors.root.message}
                                    </span>
                                )}
                            </Field>

                            <FieldDescription className="text-center">
                                حساب کاربری دارید؟{" "}
                                <Link to={"/login"}>ورود</Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    <div className="bg-secondary relative hidden md:block">
                        <img
                            src="/signup.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full  dark:brightness-[0.2] dark:grayscale p-5"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
