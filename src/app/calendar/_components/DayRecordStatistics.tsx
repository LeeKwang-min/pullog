import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { calcTotalCount } from "../_utils/dayRecord";
import { IPullupData } from "@/@types/pullup";
import DayRecordSectionCard from "./DayRecordSectionCard";
import DayRecordSetList from "./DayRecordSetList";
import { ChartNoAxesCombinedIcon } from "lucide-react";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

interface IProps {
  today: IPullupData;
}

function DayRecordStatistics({ today }: IProps) {
  return (
    <DayRecordSectionCard>
      <ScreenReaderTitle
        title="철봉 기록 달력 페이지 본문 - 선택한 날짜의 기록 통계"
        step={3}
      />
      <h3 className="flex items-center gap-1 font-bold text-xl">
        오늘의 통계
        <ChartNoAxesCombinedIcon />
      </h3>
      <StatisticsChart today={today} />
      <Separator className="h-1" />
      <DayRecordSetList today={today} />
    </DayRecordSectionCard>
  );
}

export default DayRecordStatistics;

function StatisticsChart({ today }: IProps) {
  const totalCount = calcTotalCount(today.setData);

  const chartData = [{ browser: "수행한 횟수", totalCount, fill: "#2563eb" }];
  const chartConfig = {
    totalCount: {
      label: "총 횟수",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[190px] aspect-auto">
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={250}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="totalCount" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {chartData[0].totalCount.toLocaleString()}회
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      수행한 총 횟수
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
