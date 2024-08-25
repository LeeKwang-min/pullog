"use client";

import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { useDateData } from "@/context/dateContext";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Calendar from "../_components/Calendar";

function LogCalendar() {
  const router = useRouter();
  const { date, setDate, getYear, getMonth, getDay, getDayStr } = useDateData();

  const handleBackBtn = () => {
    router.push("/log");
  };

  return (
    <main className="relative w-full h-full flex flex-col px-4 py-4 gap-4">
      <ScreenReaderTitle title="철봉 기록 달력 페이지" />
      <section className="w-full flex items-center justify-center">
        <ScreenReaderTitle title="철봉 기록 달력 페이지 헤더" step={2} />
        <ChevronLeftIcon
          onClick={() => handleBackBtn()}
          size={24}
          className="absolute left-4"
        />
        <h3 className="font-bold">풀업 달력</h3>
        <div />
      </section>

      <Calendar />
    </main>
  );
}

export default LogCalendar;
