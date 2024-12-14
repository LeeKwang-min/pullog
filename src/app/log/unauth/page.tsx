"use client";

import { ISPullupSetData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { Suspense, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeftIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import LogSetDataInputCard from "../_components/LogSetDataInputCard";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import DayRecordSectionCard from "@/app/calendar/_components/DayRecordSectionCard";
import { format } from "date-fns";
import DayRecordStatisticsChart from "@/app/calendar/_components/DayRecordStatisticsChart";
import DayRecordSetList from "@/app/calendar/_components/DayRecordSetList";
import UnAuthPopup from "@/components/common/UnAuthPopup";
import { useSearchParams } from "next/navigation";
import { getRecommendSet } from "@/lib/utils";
import LoadingAnimation from "@/components/common/LoadingAnimation";

function UnauthLog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const maxCount = Number(searchParams.get("maxCount"));

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

  useEffect(() => {
    if (maxCount) {
      const dataToRow = getRecommendSet(maxCount);
      setPullupData(dataToRow);
    }
  }, [maxCount]);

  return (
    <main className="relative w-full h-full flex flex-col px-4 py-4 gap-4">
      <ScreenReaderTitle title="철봉 기록 입력 페이지" />
      <div className="w-full flex items-center justify-between">
        <ScreenReaderTitle title="철봉 기록 입력 페이지 헤더" step={2} />
        <ChevronLeftIcon size={24} onClick={() => router.back()} />
        <h3 className="font-bold">기록 맛보기</h3>
      </div>

      <Card className="w-full grow relative flex flex-col overflow-scroll">
        <CardHeader className="w-full flex flex-col items-center">
          <ScreenReaderTitle title="날짜 정보" step={2} />
          <span className="flex items-center gap-2">
            <p className="text-xl">오늘의 기록을 진행해 보세요</p>
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
            <PlusIcon className="mr-2 h-4 w-4" /> 세트 추가
          </Button>
        </CardContent>
      </Card>

      {pullupData.filter((item) => item.count > 0).length && (
        <DayRecordSectionCard>
          <ScreenReaderTitle
            title="철봉 기록 달력 페이지 본문 - 선택한 날짜의 기록 통계"
            step={3}
          />
          <h3 className="flex items-center gap-1 font-bold text-xl">
            오늘의 통계
          </h3>
          <DayRecordStatisticsChart
            today={{
              date: format(new Date(), "yyyy-MM-dd"),
              day: "MONDAY",
              setData: pullupData.filter((item) => item.count > 0),
            }}
          />
          <Separator className="h-1" />
          <DayRecordSetList
            today={{
              date: format(new Date(), "yyyy-MM-dd"),
              day: "MONDAY",
              setData: pullupData.filter((item) => item.count > 0),
            }}
          />
        </DayRecordSectionCard>
      )}

      <UnAuthPopup />
    </main>
  );
}

export default function UnAuthLogPage() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <UnauthLog />
    </Suspense>
  );
}
