"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a custom label";

const chartConfig = {
    topProducts: {
        label: "کالا های پرفروش",
    },
} satisfies ChartConfig;

export function TopProductsChart({
    chartData,
}: {
    chartData: { product__name: string; quantity: number }[];
}) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold text-slate-800">
                    کالاهای پرفروش{" "}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {chartData && chartData.length > 0 ? (
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            layout="vertical"
                            className="border-b-2 "
                        >
                            <CartesianGrid horizontal={false} />
                            <YAxis
                                dataKey="product__name"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                hide
                            />
                            <XAxis dataKey="quantity" type="number" hide />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="line" />
                                }
                            />
                            <Bar
                                dataKey="quantity"
                                layout="vertical"
                                fill="var(--color-primary)"
                                name={"تعداد"}
                                radius={4}
                                barSize={32}
                            >
                                <LabelList
                                    dataKey="product__name"
                                    position="center"
                                    offset={8}
                                    className="fill-(--color-muted) text-base"
                                    fontSize={12}
                                />
                                <LabelList
                                    dataKey="quantity"
                                    position="right"
                                    offset={8}
                                    className="fill-foreground text-base"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                ) : (
                    <div className="h-[260px] flex flex-col items-center justify-center text-slate-400 text-sm">
                        <span className="text-lg">📉</span>
                        <p>داده‌ای برای نمایش وجود ندارد</p>
                        <p className="text-xs mt-1">
                            بعد از ثبت فاکتور، کالا های پرفروش اینجا نمایش داده می‌شود
                        </p>
                    </div>
                )}
                <p className="text-center mt-2 text-sm text-muted-foreground">
                    کالاهای پرفروش
                </p>
            </CardContent>
        </Card>
    );
}
