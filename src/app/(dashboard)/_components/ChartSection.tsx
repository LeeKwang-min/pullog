"use client";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { IPullupData } from "@/@types/pullup";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with dots";

interface IProps {
  pullupData: IPullupData[];
}

const chartConfig = {
  totalCount: {
    label: "횟수",
    color: "hsl(var(--chart-1))",
  },
  maxCount: {
    label: "최대 횟수",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function ChartSection({ pullupData }: IProps) {
  const chartData = pullupData
    .slice(0, 7)
    .reverse()
    .map((data) => {
      const totalCount = data.setData.reduce(
        (prev, next) => prev + next.count,
        0
      );

      const maxCount = Math.max(...data.setData.map((set) => set.count));

      return {
        date: data.date,
        totalCount,
        maxCount,
      };
    });

  return (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg flex flex-col gap-1">
          <span>최근 7회 횟수 변화</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <ChartLegend content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => ""}
            />
            <Line
              dataKey="totalCount"
              type="natural"
              stroke="var(--color-totalCount)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-totalCount)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="maxCount"
              type="monotone"
              stroke="var(--color-maxCount)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-maxCount)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default ChartSection;
