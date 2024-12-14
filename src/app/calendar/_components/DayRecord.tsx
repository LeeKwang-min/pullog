"use client";

import { IPullupData, IPullupDataWithPrev } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { usePullupDateData } from "@/context/PullupDateContext";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import DayRecordEmpty from "./DayRecordEmpty";
import DayRecordAnalyze from "./DayRecordAnalyze";
import DayRecordStatistics from "./DayRecordStatistics";
import { ImageDownIcon } from "lucide-react";
import { findDataWithPrevious, getLastRecord } from "@/lib/utils";

interface IProps {
  pullupData: IPullupData[];
}

function DayRecord({ pullupData }: IProps) {
  const { selectDate: date, getMonth, getDay, setDate } = usePullupDateData();
  const [todayData, setTodayData] = useState<IPullupDataWithPrev>({
    today: null,
    prev: null,
  });

  useEffect(() => {
    const todayPullupData = findDataWithPrevious(date, pullupData);
    setTodayData(todayPullupData);
  }, [date, pullupData]);

  if (!todayData.today)
    return (
      <DayRecordEmpty
        date={date}
        month={getMonth(date)}
        day={getDay(date)}
        prev={getLastRecord(pullupData)}
        pullupData={pullupData}
        setDate={setDate}
      />
    );

  return (
    <section className="w-full flex flex-col gap-3 py-2">
      <ScreenReaderTitle
        title="철봉 기록 달력 페이지 본문 - 선택한 날짜 정보"
        step={2}
      />
      <span className="w-full flex justify-center items-center gap-1 text-sm text-slate-500">
        <ImageDownIcon size={12} />{" "}
        <span className="flex items-center">
          <p className="font-bold">분석</p>과 <p className="font-bold">통계</p>
          는 길게 누르면 이미지로 저장돼요!
        </span>{" "}
        <ImageDownIcon size={12} />
      </span>
      <div className="flex flex-row gap-2 max-sm:flex-col">
        {todayData.prev && (
          <DayRecordAnalyze today={todayData.today} prev={todayData.prev} />
        )}
        <DayRecordStatistics today={todayData.today} />
      </div>
    </section>
  );
}

export default DayRecord;
