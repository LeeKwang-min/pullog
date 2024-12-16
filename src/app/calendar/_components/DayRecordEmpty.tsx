"use client";
import { CalendarX2, Dumbbell, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import useIsAuth from "@/hooks/useIsAuth";
import { IPullupData } from "@/@types/pullup";
import { differenceInDays, getDay, subDays } from "date-fns";
import RecommendSetTable from "./RecommendSetTable";
import { findMaxCount } from "@/lib/utils";

interface IProps {
  date: Date;
  month: number;
  day: number;
  prev: IPullupData | null;
  pullupData: IPullupData[];
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function DayRecordEmpty({
  month,
  day,
  date,
  prev,
  pullupData,
  setDate,
}: IProps) {
  const getReturnDayWord = () => {
    if (!prev) return "지금 바로 기록을 진행해 보세요!";

    const returnDay = differenceInDays(new Date(), new Date(prev.date));

    if (returnDay === 0) return "오늘도 수고하셨습니다!";
    if (returnDay === 1) return "오늘도 운동을 하러 오셨군요!";
    if (returnDay === 2) return "이틀만에 운동을 하러 오셨군요!";

    return `${returnDay}일 만에 운동을 하러 왔군요!`;
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold flex flex-col gap-1 items-start">
          <span>{`${month}월 ${day}일`}</span>
          <span className="text-sm text-gray-500">{`${getReturnDayWord()}`}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-bold mb-1">Pullog가 추천드려요!</p>
        <RecommendSetTable
          pullupData={pullupData}
          date={date}
          setDate={setDate}
        />
      </CardContent>
    </Card>
  );
}

export default DayRecordEmpty;
