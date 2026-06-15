// features/dashboard/components/TopProductsChart.tsx
"use client";
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

import { EmptyChartState } from "./EmptyChartState";

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
            <EmptyChartState
                title="محصولات پرفروش"
                message="هنوز محصولی فروخته نشده است"
                hint="پس از فروش محصولات، آمار اینجا نمایش داده می‌شود"
            />
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
