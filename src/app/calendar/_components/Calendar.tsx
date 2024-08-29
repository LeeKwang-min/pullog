"use client";

import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { useDateData } from "@/context/dateContext";
import { cn } from "@/lib/utils";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const DATE_STR_LIST = ["월", "화", "수", "목", "금", "토", "일"];

interface ICalendarHeaderProps {
  viewDate: Date;
  setViewDate: Dispatch<SetStateAction<Date>>;
}

function CalendarHeader({ viewDate, setViewDate }: ICalendarHeaderProps) {
  const handlePrevMonth = () => {
    setViewDate(subMonths(viewDate, 1));
  };

  const handleNextMonth = () => {
    setViewDate(addMonths(viewDate, 1));
  };

  return (
    <div className="flex justify-between items-center border-b">
      <ScreenReaderTitle title="철봉 기록 달력 헤더" step={3} />
      <div className="flex items-end gap-1 px-3 py-4">
        <span className="text-2xl font-bold">{format(viewDate, "M")}월</span>
        <span className="text-xs font-bold">{format(viewDate, "yyyy")}년</span>
      </div>
      <div className="flex items-center gap-3 px-3 py-4">
        <button onClick={handlePrevMonth}>
          <ChevronLeftIcon />
        </button>
        <button onClick={handleNextMonth}>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

function CalendarDaysStr() {
  return (
    <div className="flex items-center justify-around">
      <ScreenReaderTitle title="철봉 기록 달력 요일 문자" step={3} />
      <div className="grid grid-cols-7 gap-2 w-full">
        {DATE_STR_LIST.map((dateStr, idx) => (
          <div
            key={dateStr}
            className="w-10 h-10 flex items-center justify-center"
          >
            {dateStr}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ICalendarDaysProps {
  selectDate: Date;
  setSelectDate: Dispatch<SetStateAction<Date>>;
  viewDate: Date;
  setViewDate: Dispatch<SetStateAction<Date>>;
}

function CalendarDays({
  selectDate,
  setSelectDate,
  viewDate,
  setViewDate,
}: ICalendarDaysProps) {
  const monthStartDate = startOfMonth(viewDate);
  const monthEndDate = endOfMonth(monthStartDate);
  const calendarStartDate = startOfWeek(monthStartDate);
  const calendarEndDate = endOfWeek(monthEndDate);

  const days = [];
  let day = calendarStartDate;

  while (day <= calendarEndDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="w-full flex items-center justify-around">
      <ScreenReaderTitle title="철봉 기록 달력 요일 숫자" step={3} />
      <div className="w-full grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "w-10 h-10 flex items-center justify-center",
              isSameMonth(day, viewDate) ? "text-black" : "text-gray-500",
              isSameDay(day, selectDate) &&
                isSameDay(day, viewDate) &&
                "rounded-full bg-gray-600 text-white",
              isAfter(day, new Date()) && "cursor-not-allowed, text-slate-300"
            )}
            onClick={() => {
              if (isBefore(day, new Date())) {
                setSelectDate(day);
                setViewDate(day);
              }
            }}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}

interface IProps {}

function Calendar({}: IProps) {
  const { date, selectDate, setSelectDate } = useDateData();
  const [viewDate, setViewDate] = useState<Date>(date);

  return (
    <section className="w-full border rounded-md">
      <ScreenReaderTitle title="철봉 기록 달력 페이지 본문 - 달력" step={2} />
      <CalendarHeader viewDate={viewDate} setViewDate={setViewDate} />
      <div className="w-full flex flex-col px-1 py-2">
        <CalendarDaysStr />
        <CalendarDays
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          viewDate={viewDate}
          setViewDate={setViewDate}
        />
      </div>
    </section>
  );
}

export default Calendar;
