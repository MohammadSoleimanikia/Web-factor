import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    trend: {
        label: "فروش کل",
    },
} satisfies ChartConfig;
export function TrendChart({
    chartData,
}: {
    chartData: { date: string; total: number }[];
}) {
    return (
        <Card>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="min-h-[250px] w-full"
                >
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => value.slice(0, 7)}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    labelKey="date"
                                    nameKey="total"
                                />
                            }
                        />
                        <Bar
                            barSize={24}
                            name={"فروش کل: "}
                            dataKey="total"
                            fill="var(--color-primary)"
                            radius={7}
                        />
                    </BarChart>
                </ChartContainer>
                <p className="text-center mt-2 text-sm text-muted-foreground">
                    فروش ماهیانه
                </p>
            </CardContent>
        </Card>
    );
}
