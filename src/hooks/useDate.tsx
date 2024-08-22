import { useState } from "react";

const DAY_STRING = ["일", "월", "화", "수", "목", "금", "토"];

function useDateLogic() {
  const [date, setDate] = useState<Date>(new Date());

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

  return {
    date,
    setDate,
    getYear,
    getMonth,
    getDay,
    getDayStr,
    getDateFormat,
  };
}

export default useDateLogic;
