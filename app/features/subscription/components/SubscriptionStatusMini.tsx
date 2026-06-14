// features/subscription/components/SubscriptionStatusMini.tsx
import { NavLink } from "react-router";

import { Badge } from "@/features/shared/components/ui/badge";
import { Card } from "@/features/shared/components/ui/card";

import { useSubscription } from "../hooks/useSubscription";

export function SubscriptionStatusMini() {
    const { data: subscription, isLoading } = useSubscription();

    if (isLoading) return null;

    if (!subscription) {
        return (
            <Card className="p-3">
                <div className="flex items-center justify-between gap-3">
                    <Badge variant="destructive">بدون اشتراک</Badge>
                    <NavLink to="/subscription">
                        <span className="text-sm text-primary hover:underline cursor-pointer">
                            خرید اشتراک
                        </span>
                    </NavLink>
                </div>
            </Card>
        );
    }

    const getStatusVariant = () => {
        if (!subscription.is_active) return "destructive";
        if (subscription.days_remaining <= 7) return "destructive";
        return "default";
    };

    const getStatusText = () => {
        if (!subscription.is_active) return "غیرفعال";
        if (subscription.plan.is_trial) return "آزمایشی";
        
        // نام پلن از بک‌اند فارسی می‌آید، مستقیماً از آن استفاده می‌کنیم
        return subscription.plan.name;
    };

    const getDaysColor = () => {
        if (!subscription.is_active) return "text-destructive";
        if (subscription.days_remaining <= 7) return "text-destructive";
        if (subscription.days_remaining <= 30) return "text-yellow-500";
        return "text-primary";
    };

    return (
        <Card className="p-3">
            <div className="flex items-center justify-between gap-3">
                <Badge  variant={getStatusVariant()}>
                    {getStatusText()}
                </Badge>
                <span
                    className={`text-sm font-bold tabular-nums ${getDaysColor()}`}
                >
                    {subscription.days_remaining} روز
                </span>
            </div>
        </Card>
    );
}