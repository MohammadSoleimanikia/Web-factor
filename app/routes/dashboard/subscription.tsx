// routes/dashboard/subscription.tsx
import { AlertCircle } from "lucide-react";

import { usePurchasePlan } from "@/features/payment/hooks/usePayment";
import { Alert, AlertDescription } from "@/features/shared/components/ui/alert";
import { Button } from "@/features/shared/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";
import { SubscriptionStatus } from "@/features/subscription/components/SubscriptionStatus";
import {
    usePlans,
    useSubscription,
} from "@/features/subscription/hooks/useSubscription";

export default function SubscriptionPage() {
    const { data: subscription, isLoading: subLoading } = useSubscription();
    const { data: plans, isLoading: plansLoading } = usePlans();
    const { mutateAsync: purchasePlan, isPending } = usePurchasePlan();

    const isLoading = subLoading || plansLoading;

    if (isLoading) return <LoadingSpinner />;

    const hasActiveSubscription = subscription?.is_active === true;
    const currentPlanId = subscription?.plan?.id;

    const getDurationText = (plan: any) => {
        switch (plan.duration_unit) {
            case "day":
                return `${plan.duration} روز`;
            case "month":
                return `${plan.duration} ماه`;
            case "year":
                return `${plan.duration} سال`;
            default:
                return `${plan.duration} روز`;
        }
    };

    const handlePurchase = async (planId: number) => {
        try {
             await purchasePlan(planId);
        } catch (err) {
            console.error("🔴 Purchase error:", err);
        }
    };

    const isCurrentPlan = (planId: number) => currentPlanId === planId;

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">مدیریت اشتراک</h1>
            </div>

            {/* وضعیت اشتراک فعلی */}
            <SubscriptionStatus />

            {hasActiveSubscription && (
                <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800 dark:text-yellow-300">
                        شما هم‌اکنون اشتراک فعال دارید. برای تهیه اشتراک جدید،
                        منتظر اتمام اشتراک فعلی خود بمانید.
                    </AlertDescription>
                </Alert>
            )}

            {/* لیست پلن‌ها */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">پلن‌های موجود</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans?.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`flex flex-col ${isCurrentPlan(plan.id) ? "ring-2 ring-primary shadow-lg" : ""}`}
                        >
                            {isCurrentPlan(plan.id) && (
                                <div className="bg-primary text-white text-center py-1.5 rounded-t-lg text-sm font-medium">
                                    اشتراک فعلی شما
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    {plan.name}
                                </CardTitle>
                                {plan.is_trial && (
                                    <CardDescription className="text-primary">
                                        ✨ دوره آزمایشی رایگان
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mt-2">
                                    <span className="text-3xl font-bold">
                                        {plan.price === 0
                                            ? "رایگان"
                                            : `${plan.price.toLocaleString()} تومان`}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    مدت: {getDurationText(plan)}
                                </p>
                                {plan.is_trial && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        * بدون نیاز به پرداخت
                                    </p>
                                )}
                            </CardContent>
                            <CardFooter>
                                {isCurrentPlan(plan.id) ? (
                                    <Button
                                        className="w-full"
                                        variant="outline"
                                        disabled
                                    >
                                        فعال
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full"
                                        onClick={() => handlePurchase(plan.id)}
                                        disabled={
                                            hasActiveSubscription || isPending
                                        }
                                    >
                                        {isPending
                                            ? "در حال هدایت..."
                                            : "انتخاب پلن"}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
