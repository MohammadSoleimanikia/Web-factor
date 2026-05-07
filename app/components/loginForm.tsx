import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
    otpFormSchema,
    type OtpFormType,
    phoneFormSchema,
    type PhoneFormType,
} from "@/schemas/auth.schema";
import useAuth from "@/store/auth";
import type { Token } from "@/types/token";

type RequestOtpResponse = {
    Code: string;
};

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<PhoneFormType>({
        resolver: zodResolver(phoneFormSchema),
    });
    // using alias for using two useForm
    const {
        register: registerOtp,
        handleSubmit: handleSubmitOtp,
        formState: { errors: otpErrors },
    } = useForm<OtpFormType>({
        resolver: zodResolver(otpFormSchema),
    });

    const logIn = useAuth((state) => state.logIn);
    const navigate = useNavigate();

    const [step, setStep] = React.useState<"phone" | "otp">("phone");

    // for test. remove after implementing sms verification
    const [displayOTP, setDisplayOTP] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");
    const [otp, setOtp] = React.useState<string>("");
    const [loadingOtpRequest, setLoadingOtpRequest] = React.useState(false);
    const [loadingVerify, setLoadingVerify] = React.useState(false);

    async function onSubmitPhone(data: PhoneFormType) {
        try {
            setLoadingOtpRequest(true);

            // request backend to send OTP to phone
            const res = await apiFetch<RequestOtpResponse>(
                "/account/request_otp/",
                {
                    method: "POST",
                    body: JSON.stringify({ phone_number: data.phone_number }),
                },
            );

            // test !! remove after adding sms verification
            setDisplayOTP(res?.Code);

            setPhone(data.phone_number);
            setStep("otp");
            setLoadingOtpRequest(false);
        } catch (error) {
            setLoadingOtpRequest(false);
            if (
                typeof error === "object" &&
                error !== null &&
                "phone_number" in error &&
                Array.isArray((error as any).phone_number) &&
                (error as any).phone_number[0] ===
                    "OTP for this phone number is still valid."
            ) {
                toast.info("کد OTP هنوز معتبر است برای این شماره تلفن");
                setPhone(data.phone_number);
                setStep("otp");
                return;
            }
            const errorMessage =
                error instanceof Object && "detail" in error
                    ? (error as Record<string, string>).detail
                    : "مشکلی پیش امده است.";
            setError("phone_number", { message: errorMessage });
            console.log("error message:", error);
        }
    }

    const handleOtpChange = (value: string) => {
        setOtp(value);
        const validationResult = otpFormSchema.safeParse({ otp_code: value });
        if (validationResult.success && value.length === 6 && !loadingVerify) {
            onSubmitOtp({ otp_code: value });
        }
    };

    async function onSubmitOtp(data: OtpFormType) {
        
        if (!phone) {
            setError("phone_number", { message: "شماره تلفن یافت نشد" });
            setStep("phone");
            return;
        }

        try {
            setLoadingVerify(true);

            const result = await apiFetch<Token>("/account/register/", {
                method: "POST",
                body: JSON.stringify({
                    phone_number: phone,
                    otp_code: data.otp_code,
                }),
            });
            // assume backend returns user/session data similar to previous flow
            logIn(result);
            setLoadingVerify(false);
            navigate("/dashboard");
        } catch (error) {
            setLoadingVerify(false);
            // catch expiration error
            if (error && typeof error === "object" && "otp_code" in error) {
                const err = error as any;
                if (err.otp_code === "OTP has expired.") {
                    toast.error(
                        "کد تأیید منقضی شده است. لطفاً دوباره درخواست کنید.",
                    );
                    setStep("phone");
                    setOtp("");
                    return;
                }
            }
            const errorMessage =
                error instanceof Object && "detail" in error
                    ? (error as Record<string, string>).detail
                    : "کد اشتباه است یا مشکلی پیش آمده";
            setError("root", { message: errorMessage });
            console.log(error);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    {step === "phone" ? (
                        <form
                            className="p-6 md:p-8"
                            onSubmit={handleSubmit(onSubmitPhone)}
                        >
                            <FieldGroup>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">
                                        ورود به حساب
                                    </h1>
                                </div>

                                <Field>
                                    <label
                                        className="w-full"
                                        htmlFor="phone_number"
                                    >
                                        تلفن
                                    </label>
                                    <Input
                                        placeholder="09345677891"
                                        {...register("phone_number")}
                                        id="phone_number"
                                        type="text"
                                    />
                                    {errors?.phone_number && (
                                        <span className="text-red-500">
                                            {errors.phone_number.message}
                                        </span>
                                    )}
                                </Field>

                                <Field>
                                    <Button
                                        disabled={loadingOtpRequest}
                                        type="submit"
                                    >
                                        {loadingOtpRequest ? (
                                            <span>در حال ارسال...</span>
                                        ) : (
                                            "دریافت کد"
                                        )}
                                    </Button>
                                    {errors?.root && (
                                        <span className="text-red-500">
                                            {(errors as any).root.message}
                                        </span>
                                    )}
                                </Field>

                                <FieldDescription className="text-center">
                                    حساب کاربری ندارید؟{" "}
                                    <Link to={"/signup"}>ساخت حساب</Link>
                                </FieldDescription>
                            </FieldGroup>
                        </form>
                    ) : (
                        <form
                            className="p-6 md:p-8"
                            onSubmit={handleSubmitOtp(onSubmitOtp)}
                        >
                            <FieldGroup>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">
                                        تأیید شماره
                                    </h1>
                                    <p className="text-sm">
                                        کدی به {phone} ارسال شد
                                    </p>
                                </div>

                                <Field>
                                    <FieldLabel>کد تأیید</FieldLabel>
                                    <p>کد تأیید تست:</p>
                                    <h2 className="text-center text-lg font-semibold">
                                        {displayOTP}
                                    </h2>
                                    <div className="flex justify-center">
                                        <InputOTP
                                            {...registerOtp("otp_code")}
                                            maxLength={6}
                                            value={otp}
                                            onChange={handleOtpChange}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={5} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={3} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={0} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    {otpErrors?.otp_code && (
                                        <span className="text-red-500 text-sm block text-center mt-2">
                                            {otpErrors.otp_code.message}
                                        </span>
                                    )}
                                </Field>

                                <Field className="flex items-center gap-2">
                                    <Button
                                        disabled={loadingVerify}
                                        type="submit"
                                    >
                                        {loadingVerify ? (
                                            <span>در حال بررسی...</span>
                                        ) : (
                                            "تأیید و ورود"
                                        )}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        type="button"
                                        onClick={() => setStep("phone")}
                                    >
                                        اصلاح شماره
                                    </Button>
                                </Field>
                                {otpErrors?.root && (
                                    <span className="text-red-500 text-sm block text-center">
                                        {otpErrors.root.message}
                                    </span>
                                )}
                                <FieldDescription className="text-center">
                                    اگر کد را دریافت نکردید، دوباره تلاش کنید یا
                                    شماره را بررسی کنید.
                                </FieldDescription>
                            </FieldGroup>
                        </form>
                    )}

                    <div className="bg-secondary relative hidden md:block">
                        <img
                            src="/signup.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full  p-5"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
