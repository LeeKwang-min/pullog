import { IPullupData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import {
  calcMaxCount,
  calcTotalCount,
  getChartColor,
  getDiffCountWord,
} from "../_utils/dayRecord";
import DayRecordSectionCard from "./DayRecordSectionCard";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { format } from "date-fns";
import { cn, normalizeNumber } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface IProps {
  today: IPullupData;
  prev: IPullupData;
}

function DayRecordAnalyze({ today, prev }: IProps) {
  return (
    <DayRecordSectionCard>
      <ScreenReaderTitle
        title="철봉 기록 달력 페이지 본문 - 선택한 날짜의 기록과 최근 입력된 기록 분석"
        step={3}
      />
      <div className="w-full flex flex-col">
        <h3 className="flex items-center gap-1 font-bold text-xl">
          오늘의 분석
          <TrendingUp />
        </h3>
        <span className="flex items-center gap-1 text-slate-700">
          지난 <p className="font-bold">{format(prev.date, "M월 d일")}</p>기록에
          비해
        </span>
      </div>
      <Separator />
      <MaxCount today={today} prev={prev} />
      <Separator />
      <TotalCount today={today} prev={prev} />
    </DayRecordSectionCard>
  );
}

export default DayRecordAnalyze;

interface IChartProps {
  prevCount: number;
  todayCount: number;
}

function AnalyzeChart({ prevCount, todayCount }: IChartProps) {
  const chartData = useMemo(
    () => [
      {
        time: "횟수",
        prevCount,
        todayCount,
        prev: "지난 횟수",
        today: "오늘 횟수",
      },
    ],
    [prevCount, todayCount]
  );

  const chartConfig = {
    prevCount: {
      label: "지난 횟수",
      color: "hsl(var(--chart-1))",
    },
    todayCount: {
      label: "오늘 횟수",
      color: getChartColor(todayCount - prevCount),
    },
    label: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[90px] aspect-auto">
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <YAxis
          dataKey="time"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="prevCount" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="prevCount"
          layout="vertical"
          fill="var(--color-prevCount)"
          radius={4}
        >
          <LabelList
            dataKey="prev"
            position="insideLeft"
            offset={8}
            className="fill-[--color-label]"
            fontSize={12}
          />
          <LabelList
            dataKey="prevCount"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
        <Bar
          dataKey="todayCount"
          layout="vertical"
          fill="var(--color-todayCount)"
          radius={4}
        >
          <LabelList
            dataKey="today"
            position="insideLeft"
            offset={8}
            className="fill-[--color-label]"
            fontSize={12}
          />
          <LabelList
            dataKey="todayCount"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

function MaxCount({ today, prev }: IProps) {
  const prevMaxCount = calcMaxCount(prev.setData);
  const todayMaxCount = calcMaxCount(today.setData);
  const diffCount = todayMaxCount - prevMaxCount;
  const diffCountWord = getDiffCountWord(diffCount);

  return (
    <div className="w-full flex flex-col">
      <AnalyzeChart prevCount={prevMaxCount} todayCount={todayMaxCount} />
      <span className="flex items-center gap-1 text-slate-700">
        <p className="font-bold">최대 횟수가</p>
        <p
          className={cn(
            "font-bold text-blue-600 underline",
            diffCount === 0 && "text-green-600",
            diffCount < 0 && "text-red-400"
          )}
        >
          {`${diffCount === 0 ? "" : `${normalizeNumber(diffCount)}회`}`}{" "}
          {diffCountWord}
        </p>
        <p>{diffCount === 0 ? "됐어요" : "했어요"}</p>
      </span>
    </div>
  );
}

function TotalCount({ today, prev }: IProps) {
  const prevTotalCount = calcTotalCount(prev.setData);
  const todayTotalCount = calcTotalCount(today.setData);
  const diffCount = todayTotalCount - prevTotalCount;
  const diffCountWord = getDiffCountWord(diffCount);

  return (
    <div className="w-full flex flex-col">
      <AnalyzeChart prevCount={prevTotalCount} todayCount={todayTotalCount} />
      <span className="flex items-center gap-1 text-slate-700">
        <p className="font-bold">총 횟수가</p>
        <p
          className={cn(
            "font-bold text-blue-600 underline",
            diffCount === 0 && "text-green-600",
            diffCount < 0 && "text-red-400"
          )}
        >
          {`${diffCount === 0 ? "" : `${normalizeNumber(diffCount)}회`}`}{" "}
          {diffCountWord}
        </p>
        <p>{diffCount === 0 ? "됐어요" : "했어요"}</p>
      </span>
    </div>
  );
}
