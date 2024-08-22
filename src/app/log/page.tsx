"use client";

import { ISPullupSetData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { Button } from "@/components/ui/button";
import useDateLogic from "@/hooks/useDate";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  CirclePlusIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Log() {
  const { date, getMonth, getDay, getYear, getDayStr } = useDateLogic();
  const [pullupDate, setPullupDate] = useState<ISPullupSetData[]>([
    {
      set: 1,
      count: 0,
    },
  ]);

  const addSet = () => {
    setPullupDate((prev) => [
      ...prev,
      {
        set: prev.length + 1,
        count: 0,
      },
    ]);
  };

  return (
    <main className="relative w-full h-full flex flex-col px-4 py-4 gap-4">
      <ScreenReaderTitle title="철봉 기록 입력 페이지" />
      <div className="w-full flex items-center justify-between">
        <ChevronLeftIcon size={24} />
        <h3 className="justify-self-center font-bold">풀업 기록</h3>
        <CalendarDaysIcon size={24} />
      </div>

      <Card className="w-full grow relative flex flex-col overflow-scroll">
        <CardHeader className="w-full flex flex-col items-center">
          <ScreenReaderTitle title="날짜 정보" step={2} />
          <span className="text-slate-500 text-sm flex gap-1">
            <p>{getYear(date)}년</p> <p>{`(${getDayStr(date)})`}</p>
          </span>
          <span className="flex items-center gap-2">
            <p className="text-3xl">{getMonth(date)}월</p>{" "}
            <p className="text-3xl">{getDay(date)}일</p>
          </span>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center grow max-h-fit overflow-scroll">
          <ScreenReaderTitle title="세트, 횟수 입력 섹션" step={2} />
          <div className="flex flex-col gap-2 w-full">
            {pullupDate.map((pullup, idx) => {
              const { set, count, time } = pullup;

              return (
                <div
                  key={idx}
                  className="w-full flex items-center border py-2 px-2 justify-around rounded-md"
                >
                  <Label htmlFor={`${set}set`} className="text-xs">
                    {set} 세트
                  </Label>
                  <div className="flex items-center col-span-2 gap-1">
                    <Input
                      id={`${set}set`}
                      value={count}
                      className="w-14 h-8 text-xs"
                    />
                    <Label htmlFor={`${set}set`} className="text-xs">
                      회
                    </Label>
                  </div>

                  <div className="flex items-center col-span-2">
                    <Input
                      id={`${set}setMinute`}
                      value={time?.minute}
                      className="w-10 h-8 mr-1 text-xs"
                    />
                    <Label htmlFor={`${set}setMinute`} className="mr-3 text-xs">
                      분
                    </Label>

                    <Input
                      id={`${set}setSec`}
                      value={time?.second}
                      className="w-10 h-8 mr-1 text-xs"
                    />
                    <Label htmlFor={`${set}setSec`} className="text-xs">
                      초
                    </Label>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="ghost" onClick={addSet} className="mb-10">
            <CirclePlusIcon />
          </Button>
        </CardContent>
        <CardFooter className="w-full">
          <Button className="w-full">저장하기</Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Log;
