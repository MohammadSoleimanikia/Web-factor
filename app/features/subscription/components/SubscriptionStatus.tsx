import dayjs from "dayjs";

import { Badge } from "@/features/shared/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";
import LoadingSpinner from "@/features/shared/components/ui/loadingSpinner";
import { Progress } from "@/features/shared/components/ui/progress";

import { useSubscription } from "../hooks/useSubscription";

export function SubscriptionStatus() {
    const { data: subscription, isLoading } = useSubscription();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!subscription) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                        هیچ اشتراک فعالی ندارید
                    </p>
                </CardContent>
            </Card>
        );
    }

    const getStatusBadge = () => {
        if (!subscription.is_active) {
            return <Badge variant="destructive">غیرفعال</Badge>;
        }
        if (subscription.plan.is_trial) {
            return (
                <Badge variant="outline" className="text-primary">
                    دوره آزمایشی
                </Badge>
            );
        }
        if (subscription.days_remaining <= 7) {
            return <Badge variant="destructive">در حال اتمام</Badge>;
        }
        return (
            <Badge variant="default" className="bg-green-500">
                فعال
            </Badge>
        );
    };

    const getProgressPercent = () => {
        const start = dayjs(subscription.started_at);
        const end = dayjs(subscription.expires_at);
        const total = end.diff(start, "day");
        const remaining = subscription.days_remaining;
        if (total <= 0) return 0;
        return (remaining / total) * 100;
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>وضعیت اشتراک</CardTitle>
                {getStatusBadge()}
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p className="text-sm text-muted-foreground">پلن فعال</p>
                    <p className="font-semibold text-lg">
                        {subscription.plan.name}
                    </p>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span>روزهای باقی‌مانده</span>
                        <span className="font-medium">
                            {subscription.days_remaining} روز
                        </span>
                    </div>
                    <Progress value={getProgressPercent()} />
                </div>

                <div className="flex justify-between text-sm">
                    <div>
                        <p className="text-muted-foreground">تاریخ انقضا</p>
                        <p>
                            {dayjs(subscription.expires_at).format(
                                "YYYY/MM/DD",
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">تاریخ شروع</p>
                        <p>
                            {dayjs(subscription.started_at).format(
                                "YYYY/MM/DD",
                            )}
                        </p>
                    </div>
                    
                </div>
            </CardContent>
        </Card>
    );
}
