"use client";
import { TrendingUp } from "lucide-react";
import { Cell, LabelList, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/features/shared/components/ui/chart";

export const description = "A pie chart with a label list";

const chartConfig = {} satisfies ChartConfig;

type TopProduct = {
    product__name: string;
    quantity: number;
};

type TopProductsChartProps = {
    chartData: TopProduct[];
};

const getFillColor = (index: number) => {
    return `var(--chart-${(index % 5) + 1})`;
};

export function TopProductsChart({ chartData }: TopProductsChartProps) {
    if (!chartData || chartData.length === 0) {
        return (
            <Card className="flex flex-col h-full">
                <CardHeader className="items-center pb-0">
                    <CardTitle>روند فروش</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center py-12">
                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                            <TrendingUp className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground">
                            هنوز داده‌ای برای نمایش وجود ندارد
                        </p>
                        <p className="text-xs text-muted-foreground">
                            پس از ثبت فاکتورها، آمار اینجا نمایش داده می‌شود
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>محصولات پرفروش</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    nameKey="quantity"
                                    hideLabel
                                />
                            }
                        />
                        <Pie
                            data={chartData}
                            dataKey="quantity"
                            nameKey="product__name"
                            cx="50%"
                            cy="50%"
                            outerRadius="100%"
                            labelLine={false}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getFillColor(index)}
                                />
                            ))}

                            <LabelList
                                dataKey="product__name"
                                className="fill-background"
                                stroke="none"
                                fontSize={12}
                                formatter={(value: string) => value}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
