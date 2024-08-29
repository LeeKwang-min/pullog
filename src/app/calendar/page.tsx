"use client";

import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { ChevronLeftIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Calendar from "./_components/Calendar";
import DayRecord from "./_components/DayRecord";
import { useState } from "react";
import { useDateData } from "@/context/dateContext";

function LogCalendar() {
  const { date, setDate, selectDate } = useDateData();

  const router = useRouter();

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
      <DayRecord />
    </main>
  );
}

export default LogCalendar;
