"use client";

import { ISPullupSetData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { Button } from "@/components/ui/button";
import useDateLogic from "@/hooks/useDate";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  CirclePlusIcon,
  RefreshCcwIcon,
  Trash2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDateData } from "@/context/dateContext";

function Log() {
  const router = useRouter();
  const { date, setDate, getYear, getMonth, getDay, getDayStr } = useDateData();
  const [pullupData, setPullupData] = useState<ISPullupSetData[]>([
    {
      count: 0,
    },
  ]);

  const addSet = () => {
    setPullupData((prev) => [
      ...prev,
      {
        count: 0,
      },
    ]);
  };

  const deleteSet = (idx: number) => {
    setPullupData((prev) => prev.filter((_, i) => idx !== i));
  };

  const handleSetData = (key: string, idx: number, value: number) => {
    setPullupData((prev) => {
      return prev.map((item, i) => {
        if (idx === i)
          return {
            ...item,
            [key]: value,
          };
        else return item;
      });
    });
  };

  const refreshSetData = (idx: number) => {
    setPullupData((prev) => {
      return prev.map((item, i) => {
        if (idx === i)
          return {
            count: 0,
          };
        else return item;
      });
    });
  };

  const handleSaveData = () => {
    // 1. 저장 validation (number 체크, 값 입력 체크 등등)
    // 2. validation fail시 알림 띄우기
    // 3. 서버에 데이터 저장
    // 4. 저장 완료 알림 후 logCalendar로 이동
    console.log(pullupData);
    router.push("/log/calendar");
  };

  return (
    <main className="relative w-full h-full flex flex-col px-4 py-4 gap-4">
      <ScreenReaderTitle title="철봉 기록 입력 페이지" />
      <div className="w-full flex items-center justify-between">
        <ScreenReaderTitle title="철봉 기록 입력 페이지 헤더" step={2} />
        <ChevronLeftIcon size={24} />
        <h3 className="font-bold">풀업 기록</h3>
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
            {pullupData.map((pullup, idx) => {
              const { count, minute, second } = pullup;

              return (
                <div
                  key={idx}
                  className="flex flex-col gap-2 w-full border py-2 px-2 rounded-md"
                >
                  <div className="grid grid-cols-6 items-center">
                    <Label
                      htmlFor={`${idx + 1}set`}
                      className="text-sm font-semibold"
                    >
                      {idx + 1} 세트
                    </Label>
                    <Input
                      id={`${idx + 1}set`}
                      type="number"
                      value={count || ""}
                      onChange={(e) =>
                        handleSetData("count", idx, Number(e.target.value))
                      }
                      className="h-8 text-sm col-span-2"
                    />
                    <Label
                      htmlFor={`${idx + 1}set`}
                      className="text-sm font-semibold px-2"
                    >
                      회
                    </Label>
                    <div className="flex items-center gap-2 col-span-2 justify-end">
                      <button
                        onClick={() => refreshSetData(idx)}
                        className="rounded-full border px-1 py-1"
                      >
                        <RefreshCcwIcon color="#71b0c2" size={18} />
                      </button>
                      <button
                        onClick={() => deleteSet(idx)}
                        className="rounded-full border px-1 py-1"
                      >
                        <Trash2Icon color="#ff8585" size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 items-center gap-2">
                    <div />
                    <div className="flex items-center col-span-2">
                      <Input
                        id={`${idx + 1}setMinute`}
                        type="number"
                        value={minute || ""}
                        onChange={(e) =>
                          handleSetData("minute", idx, Number(e.target.value))
                        }
                        className="h-8 mr-1 text-sm"
                      />
                      <Label
                        htmlFor={`${idx + 1}setMinute`}
                        className="text-sm font-semibold"
                      >
                        분
                      </Label>
                    </div>

                    <div className="flex items-center gap-1 col-span-2">
                      <Input
                        id={`${idx + 1}setSec`}
                        type="number"
                        value={second || ""}
                        onChange={(e) =>
                          handleSetData("second", idx, Number(e.target.value))
                        }
                        className="h-8 mr-1 text-sm"
                      />
                      <Label
                        htmlFor={`${idx + 1}setSec`}
                        className="text-sm font-semibold"
                      >
                        초
                      </Label>
                    </div>
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
          <Button onClick={() => handleSaveData()} className="w-full">
            저장하기
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Log;
