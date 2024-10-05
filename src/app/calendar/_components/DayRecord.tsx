"use client";

import { IPullupData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { usePullupDateData } from "@/context/PullupDateContext";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import DayRecordEmpty from "./DayRecordEmpty";
import DayRecordAnalyze from "./DayRecordAnalyze";
import DayRecordStatistics from "./DayRecordStatistics";
import DayRecordSetList from "./DayRecordSetList";
import { ImageDownIcon } from "lucide-react";

interface IPullupDataWithPrev {
  today: IPullupData | null;
  prev: IPullupData | null;
}

interface IProps {
  pullupData: IPullupData[];
}

function DayRecord({ pullupData }: IProps) {
  const { selectDate: date, getMonth, getDay } = usePullupDateData();
  const [todayData, setTodayData] = useState<IPullupDataWithPrev>({
    today: null,
    prev: null,
  });

  const findDataWithPrevious = (
    date: string,
    dataSet: IPullupData[]
  ): IPullupDataWithPrev => {
    const index = dataSet.findIndex((data) => data.date === date);
    if (index === -1) {
      return { today: null, prev: null };
    }

    const today = dataSet[index];
    const prev = index > 0 ? dataSet[index - 1] : null;

    return { today, prev };
  };

  useEffect(() => {
    const todayPullupData = findDataWithPrevious(
      format(date, "yyyy-MM-dd"),
      pullupData
    );
    setTodayData(todayPullupData);
  }, [date]);

  if (!todayData.today)
    return <DayRecordEmpty month={getMonth(date)} day={getDay(date)} />;

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
      {todayData.prev && (
        <DayRecordAnalyze today={todayData.today} prev={todayData.prev} />
      )}
      <DayRecordStatistics today={todayData.today} />
    </section>
  );
}

export default DayRecord;
