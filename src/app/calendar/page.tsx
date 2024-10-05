"use client";

import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Calendar from "./_components/Calendar";
import DayRecord from "./_components/DayRecord";
import { usePullupDateData } from "@/context/PullupDateContext";
import { useEffect, useState } from "react";
import { IPullupData } from "@/@types/pullup";
import { getPullupRecord } from "@/apis/pullup_record";

function LogCalendar() {
  const { setDate, selectDate } = usePullupDateData();
  const [pullupData, setPullupData] = useState<IPullupData[]>([]);

  const router = useRouter();

  const handleAllRecord = async () => {
    const data = await getPullupRecord();
    setPullupData(data as IPullupData[]);
  };

  useEffect(() => {
    handleAllRecord();
  }, []);

  const handleBackBtn = () => {
    router.push("/");
  };

  const handleEditBtn = () => {
    setDate(selectDate);
    router.push("/log");
  };

  return (
    <main className="relative w-full h-full flex flex-col px-4 py-4 gap-4">
      <ScreenReaderTitle title="철봉 기록 달력 페이지" />
      <section className="w-full flex items-center justify-between">
        <ScreenReaderTitle title="철봉 기록 달력 페이지 헤더" step={2} />
        <ChevronLeftIcon onClick={() => handleBackBtn()} size={24} />
        <h3 className="font-bold">풀업 달력</h3>
        <PencilIcon onClick={() => handleEditBtn()} size={24} />
      </section>
      <Calendar />
      <DayRecord pullupData={pullupData} />
    </main>
  );
}

export default LogCalendar;
