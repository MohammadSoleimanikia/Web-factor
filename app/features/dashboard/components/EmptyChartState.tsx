// features/dashboard/components/EmptyChartState.tsx
import { TrendingUp } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";

interface EmptyChartStateProps {
    title: string;
    message: string;
    hint?: string;
}

export function EmptyChartState({
    title,
    message,
    hint,
}: EmptyChartStateProps) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">{message}</p>
                    {hint && (
                        <p className="text-xs text-muted-foreground">{hint}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
