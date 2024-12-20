"use client";

import { ISPullupSetData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePullupDateData } from "@/context/PullupDateContext";
import LogHeader from "./_components/LogHeader";
import LogSetDataInputCard from "./_components/LogSetDataInputCard";
import { Separator } from "@/components/ui/separator";
import { getDayPullupRecord } from "@/apis/pullup_record";
import { useSearchParams } from "next/navigation";
import { getRecommendSet } from "@/lib/utils";
import LoadingAnimation from "@/components/common/LoadingAnimation";

function Log() {
  const searchParams = useSearchParams();
  const maxCount = Number(searchParams.get("maxCount"));

  const {
    date,
    getYear,
    getMonth,
    getDay,
    getDayStr,
    getDayEngStr,
    setIsRefresh,
  } = usePullupDateData();
  const snsLinkRef = useRef<HTMLInputElement>(null);
  const [pullupData, setPullupData] = useState<ISPullupSetData[]>([
    {
      count: 0,
    },
  ]);

  useEffect(() => {
    if (maxCount) {
      const dataToRow = getRecommendSet(maxCount);
      setPullupData(dataToRow);
    }
  }, [maxCount]);

  const handleCurDayPullupData = async () => {
    const curPullupData = await getDayPullupRecord(date);
    if (curPullupData && curPullupData[0].setData)
      setPullupData(curPullupData[0].setData);
  };

  useEffect(() => {
    handleCurDayPullupData();
  }, [date]);

  const addSet = () => {
    setPullupData((prev) => [
      ...prev,
      {
        count: 0,
      },
    ]);
  };

  return (
    <main className="relative w-full h-full flex flex-col px-4 py-4 gap-4">
      <ScreenReaderTitle title="철봉 기록 입력 페이지" />
      <LogHeader
        date={date}
        pullupData={pullupData}
        getDayEngStr={getDayEngStr}
        setIsRefresh={setIsRefresh}
      />

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
          <div className="flex flex-col gap-4 w-full mb-4">
            {pullupData.map((pullup, idx) => {
              const { count, second } = pullup;

              return (
                <div key={`set-${idx}`}>
                  <LogSetDataInputCard
                    setPullupData={setPullupData}
                    count={count}
                    second={second}
                    setNumber={idx}
                  />
                  <Separator className="opacity-30" />
                </div>
              );
            })}
          </div>
          <Button
            onClick={addSet}
            className="w-full bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 hover:border-primary/30"
          >
            <Plus className="mr-2 h-4 w-4" /> 세트 추가
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

export default function LogPage() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <Log />
    </Suspense>
  );
}
