import type { LucideIcon } from "lucide-react";
import num2persian from "num2persian";

import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "../ui/card";

type InvoiceStatCardProps = {
    title: string;
    value: number;
    unit: string;
    icon: LucideIcon;
    showPersianText?: boolean;
    className?: string;
};

export default function InvoiceStatCard({
    title,
    value,
    unit,
    icon: Icon,/*change name to use as component*/
    showPersianText = false,
    className,
}: InvoiceStatCardProps) {
    return (
        <Card className={`flex flex-col justify-between ${className ?? ""}`}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm text-muted-foreground">
                    {title}
                </CardTitle>

                <CardAction className="rounded-full bg-muted p-2">
                    <Icon className="w-5 h-5" />
                </CardAction>
            </CardHeader>

            <CardContent className="space-y-1">
                <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold">{value}</p>
                    <span className="text-sm text-muted-foreground">
                        {unit}
                    </span>
                </div>

                {showPersianText && (
                    <p className="text-xs text-muted-foreground">
                        {num2persian(value)}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
