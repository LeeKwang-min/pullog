"use client";

import { IPullupData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { Button } from "@/components/ui/button";
import { TMP_DATA_SET } from "@/const/tmpData";
import { useDateData } from "@/context/dateContext";
import { format } from "date-fns";
import { FlameIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  calcDiffBestCountBetweenSet,
  calcDiffTotalCountBetweenSet,
  calcTodayTotalCount,
  calcTodayTotalTime,
  getDiffCountWord,
} from "../_utils/dayRecord";
import DayRecordEmpty from "./DayRecordEmpty";

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
    <section className="w-full border rounded-md px-1 py-2">
      <ScreenReaderTitle
        title="철봉 기록 달력 페이지 본문 - 선택한 날짜 정보"
        step={2}
      />
      {todayData.prev && (
        <div className="w-full flex flex-col gap-2 mt-2">
          <ScreenReaderTitle
            title="철봉 기록 달력 페이지 본문 - 선택한 날짜의 기록과 최근 입력된 기록 분석"
            step={3}
          />
          <h3 className="font-bold text-lg">오늘의 분석</h3>
          <div className="flex flex-col">
            <span>{`지난 기록(${todayData.prev.date}) 보다`}</span>
            <span className="flex items-center gap-1">
              <p>최대 횟수가</p>
              <p>{`${calcDiffBestCountBetweenSet(
                todayData.prev.setData,
                todayData.today.setData
              )}회`}</p>
              <p>
                {getDiffCountWord(
                  calcDiffBestCountBetweenSet(
                    todayData.prev.setData,
                    todayData.today.setData
                  )
                )}
                했어요
              </p>
            </span>
            <span className="flex items-center gap-1">
              <p>총 횟수가</p>
              <p>{`${calcDiffTotalCountBetweenSet(
                todayData.prev.setData,
                todayData.today.setData
              )}회`}</p>
              <p>
                {getDiffCountWord(
                  calcDiffTotalCountBetweenSet(
                    todayData.prev.setData,
                    todayData.today.setData
                  )
                )}
                했어요
              </p>
            </span>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col gap-2 mt-2 border-t">
        <ScreenReaderTitle
          title="철봉 기록 달력 페이지 본문 - 선택한 날짜의 기록 통계"
          step={3}
        />
        <h3 className="font-bold text-lg">오늘의 통계</h3>
        <div>
          <span>
            오늘 수행한 총 횟수: {calcTodayTotalCount(todayData.today.setData)}{" "}
            회
          </span>
        </div>
        <div>
          <span className="flex items-center gap-1">
            오늘 들인 총 시간:
            <p>
              {Math.floor(calcTodayTotalTime(todayData.today.setData) / 60)} 분
            </p>
            <p>{calcTodayTotalTime(todayData.today.setData) % 60} 초</p>
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 mt-2 border-t">
        <ScreenReaderTitle
          title="철봉 기록 달력 페이지 본문 - 선택한 날짜의 기록 리스트"
          step={3}
        />
        <h3 className="font-bold text-lg">오늘의 기록</h3>
        {todayData.today.setData.map((set, idx) => {
          const { count, second } = set;

          return (
            <div
              key={idx}
              className="flex items-center gap-5 border rounded-md px-2 py-1"
            >
              <span>{idx + 1} 세트</span>
              <span className="flex gap-2">
                <p>{count} 회</p>
                <p>-</p>
                <p> {second} 초</p>
              </span>
              {/* 최고 세트 표시해 주는 UI 있으면 좋을듯 */}
              {idx === 0 && (
                <span className="flex items-center text-red-500">
                  <FlameIcon />
                  <p>Best</p>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default DayRecord;
