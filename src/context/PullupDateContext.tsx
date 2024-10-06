"use client";

import { TDayConst } from "@/@types/pullup";
import { SetStateAction, createContext, useContext, useState } from "react";

interface IDateContextProps {
  date: Date;
  setDate: React.Dispatch<SetStateAction<Date>>;
  selectDate: Date;
  setSelectDate: React.Dispatch<SetStateAction<Date>>;
  isRefresh: boolean;
  setIsRefresh: React.Dispatch<SetStateAction<boolean>>;
  getYear: (date: Date) => number;
  getMonth: (date: Date) => number;
  getDay: (date: Date) => number;
  getDayStr: (date: Date) => string;
  getDateFormat: (date: Date) => string;
  getDayEngStr: (curDate: Date) => TDayConst;
}

const PullupDateContext = createContext<IDateContextProps | undefined>(
  undefined
);

const DAY_STRING = ["일", "월", "화", "수", "목", "금", "토"];
const DAY_ENG_STRING = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectDate, setSelectDate] = useState<Date>(new Date());
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const getYear = (curDate: Date) => {
    return curDate.getFullYear();
  };

  const getMonth = (curDate: Date) => {
    return curDate.getMonth() + 1;
  };

  const getDay = (curDate: Date) => {
    return curDate.getDate();
  };

  const getDayStr = (curDate: Date) => {
    return DAY_STRING[curDate.getDay()];
  };

  const getDayEngStr = (curDate: Date) => {
    return DAY_ENG_STRING[curDate.getDay()] as TDayConst;
  };

  const getDateFormat = (curDate: Date) => {
    const year = curDate.getFullYear();
    const month = String(curDate.getMonth() + 1).padStart(2, "0");
    const day = String(curDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <PullupDateContext.Provider
      value={{
        date,
        setDate,
        selectDate,
        setSelectDate,
        isRefresh,
        setIsRefresh,
        getYear,
        getMonth,
        getDay,
        getDayStr,
        getDateFormat,
        getDayEngStr,
      }}
    >
      {children}
    </PullupDateContext.Provider>
  );
};

export const usePullupDateData = () => {
  const context = useContext(PullupDateContext);
  if (!context) {
    throw new Error("useChannelMetaData must be used within a ChannelProvider");
  }
  return context;
};
