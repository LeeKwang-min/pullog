"use client";

import { SetStateAction, createContext, useContext, useState } from "react";

interface IDateContextProps {
  date: Date;
  setDate: React.Dispatch<SetStateAction<Date>>;
  selectDate: Date;
  setSelectDate: React.Dispatch<SetStateAction<Date>>;
  getYear: (date: Date) => number;
  getMonth: (date: Date) => number;
  getDay: (date: Date) => number;
  getDayStr: (date: Date) => string;
  getDateFormat: (date: Date) => string;
}

const DateContext = createContext<IDateContextProps | undefined>(undefined);

const DAY_STRING = ["일", "월", "화", "수", "목", "금", "토"];

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectDate, setSelectDate] = useState<Date>(new Date());

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

  const getDateFormat = (curDate: Date) => {
    const year = curDate.getFullYear();
    const month = String(curDate.getMonth() + 1).padStart(2, "0");
    const day = String(curDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <DateContext.Provider
      value={{
        date,
        setDate,
        selectDate,
        setSelectDate,
        getYear,
        getMonth,
        getDay,
        getDayStr,
        getDateFormat,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

export const useDateData = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useChannelMetaData must be used within a ChannelProvider");
  }
  return context;
};
