"use client";

import { IPullupData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { TMP_DATA_SET } from "@/const/tmpData";
import { useDateData } from "@/context/dateContext";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import DayRecordEmpty from "./DayRecordEmpty";
import DayRecordAnalyze from "./DayRecordAnalyze";
import DayRecordStatistics from "./DayRecordStatistics";
import DayRecordSetList from "./DayRecordSetList";

interface IPullupDataWithPrev {
  today: IPullupData | null;
  prev: IPullupData | null;
}

function DayRecord() {
  const { selectDate: date, getMonth, getDay } = useDateData();
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
      TMP_DATA_SET
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
      {todayData.prev && (
        <DayRecordAnalyze today={todayData.today} prev={todayData.prev} />
      )}
      <DayRecordStatistics today={todayData.today} />
    </section>
  );
}

export default DayRecord;
