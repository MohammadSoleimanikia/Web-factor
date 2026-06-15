// routes/payment/result.tsx
import { AlertCircle, CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { useVerifyPayment } from "@/features/payment/hooks/usePayment";
import { Button } from "@/features/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";

type PaymentResultType = {
    status: "success" | "failed" | "processing";
    ref_id?: string;
    message?: string;
};

export default function PaymentResultPage() {
    const [searchParams] = useSearchParams();
    const [result, setResult] = useState<PaymentResultType | null>(null);
    const { mutateAsync: verifyPayment, isPending } = useVerifyPayment();

    useEffect(() => {
        const processPayment = async () => {
            const authority = searchParams.get("Authority");
            const status = searchParams.get("Status");

            

            if (authority) {
                if (status === "OK") {
                    try {
                        const response = await verifyPayment(authority);
                        setResult({
                            status: "success",
                            ref_id: response.ref_id,
                            message: "پرداخت شما با موفقیت انجام شد",
                        });
                    } catch (error) {
                        console.log(error)
                        setResult({
                            status: "failed",
                            message: "خطا در تایید پرداخت",
                        });
                    }
                }
                // کاربر پرداخت را لغو کرده
                else {
                    setResult({
                        status: "failed",
                        message: "پرداخت توسط کاربر لغو شد",
                    });
                }
            }
            // بدون Authority (خطا)
            else {
                setResult({
                    status: "failed",
                    message: "اطلاعات پرداخت یافت نشد",
                });
            }
        };

        processPayment();
    }, [searchParams, verifyPayment]);

    if (isPending) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <p className="text-muted-foreground">در حال تایید پرداخت...</p>
            </div>
        );
    }

    const getIcon = () => {
        switch (result?.status) {
            case "success":
                return <CheckCircle className="w-20 h-20 text-green-500" />;
            case "failed":
                return <XCircle className="w-20 h-20 text-red-500" />;
            default:
                return <AlertCircle className="w-20 h-20 text-yellow-500" />;
        }
    };

    const getTitle = () => {
        switch (result?.status) {
            case "success":
                return "پرداخت موفق";
            case "failed":
                return "پرداخت ناموفق";
            default:
                return "خطا در پرداخت";
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">{getIcon()}</div>
                    <CardTitle className="text-2xl">{getTitle()}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{result?.message}</p>

                    {result?.ref_id && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                                کد رهگیری:
                            </p>
                            <p className="font-mono font-semibold text-green-600">
                                {result.ref_id}
                            </p>
                        </div>
                    )}

                    <Link
                        to={
                            result?.status === "success"
                                ? "/dashboard"
                                : "/subscription"
                        }
                    >
                        <Button className="w-full">
                            {result?.status === "success"
                                ? "بازگشت به داشبورد"
                                : "تلاش مجدد"}
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
