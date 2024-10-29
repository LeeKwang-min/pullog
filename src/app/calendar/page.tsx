"use client";

import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { ChevronLeftIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Calendar from "./_components/Calendar";
import DayRecord from "./_components/DayRecord";
import { usePullupDateData } from "@/context/PullupDateContext";
import { useEffect, useState } from "react";
import { IPullupData } from "@/@types/pullup";
import { delPullupRecord, getPullupRecord } from "@/apis/pullup_record";
import LoadingAnimation from "@/components/common/LoadingAnimation";
import { Button } from "@/components/ui/button";
import { findTodayDataId } from "@/lib/utils";
import UnAuthPopup from "@/components/common/UnAuthPopup";
import useIsAuth from "@/hooks/useIsAuth";

function LogCalendar() {
  const { setDate, selectDate, isRefresh, setIsRefresh } = usePullupDateData();
  const { isAuthenticated } = useIsAuth();
  const [pullupData, setPullupData] = useState<IPullupData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const selectDateId = findTodayDataId(selectDate, pullupData);

  const router = useRouter();

  const handleAllRecord = async () => {
    setIsLoading(true);
    const data = await getPullupRecord();
    setPullupData(data as IPullupData[]);
    setIsLoading(false);
  };

  useEffect(() => {
    handleAllRecord();
  }, [isRefresh]);

  const handleBackBtn = () => {
    router.back();
  };

  const handleEditBtn = () => {
    setDate(selectDate);
    if (isAuthenticated) router.push("/log");
    else router.push("/log/unauth");
  };

  const handleDeleteBtn = async () => {
    if (selectDateId) {
      const result = await delPullupRecord(selectDateId);
      if (result) setIsRefresh((prev) => !prev);
    }
  };

  if (isLoading) return <LoadingAnimation />;

  return (
    <main className="relative w-full h-full flex flex-col px-4 py-4 gap-4">
      <ScreenReaderTitle title="철봉 기록 달력 페이지" />
      <header className="flex items-center bg-background relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackBtn}
          className="absolute left-0"
        >
          <ChevronLeftIcon className="h-6 w-6" />
          <span className="sr-only">뒤로 가기</span>
        </Button>
        <h1 className="text-lg font-semibold w-full text-center">풀업 달력</h1>
        <div className="flex items-center space-x-1 absolute right-0">
          {selectDateId && isAuthenticated && (
            <Button variant="ghost" size="icon" onClick={handleDeleteBtn}>
              <Trash2Icon size={20} color="#f87171" />
              <span className="sr-only">삭제</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={handleEditBtn}>
            <PencilIcon size={20} />
            <span className="sr-only">수정</span>
          </Button>
        </div>
      </header>
      <UnAuthPopup />

      <Calendar />
      <DayRecord pullupData={pullupData} />
    </main>
  );
}

export default LogCalendar;
