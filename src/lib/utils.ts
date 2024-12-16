import { IPullupData, IPullupDataWithPrev } from "@/@types/pullup";
import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizeNumber = (value: number): number => {
  return value < 0 ? -value : value;
};

export const findTodayDataId = (date: Date, dataSet: IPullupData[]) => {
  const todayData = (dataSet || []).filter(
    (data) => data.date === format(date, "yyyy-MM-dd")
  );
  if (!todayData.length) return null;
  return todayData[0].id || null;
};

export const findDataWithPrevious = (
  date: Date,
  dataSet: IPullupData[]
): IPullupDataWithPrev => {
  const index = (dataSet || []).findIndex(
    (data) => data.date === format(date, "yyyy-MM-dd")
  );
  if (index === -1) {
    return { today: null, prev: null };
  }

  const today = dataSet[index];
  const prev = index > 0 ? dataSet[index - 1] : null;

  return { today, prev };
};

export const getLastRecord = (dataSet: IPullupData[]) => {
  if (!dataSet.length) return null;

  const lastRecord = dataSet[dataSet.length - 1];
  return lastRecord;
};

export const findMaxCount = (dataSet: IPullupData[]) => {
  if (!dataSet.length) return null;

  const maxCount = dataSet.reduce((prev, next) => {
    return Math.max(prev, Math.max(...next.setData.map((data) => data.count)));
  }, 0);
  return maxCount;
};

export const getRecommendSet = (maxCount: number) => {
  if (maxCount < 3) {
    const dataToRow = [
      { count: 1 },
      { count: 2 },
      { count: 3 },
      { count: 2 },
      { count: 1 },
    ];

    return dataToRow;
  } else {
    const dataToRow = [
      { count: Math.floor(maxCount * 0.3) },
      { count: Math.floor(maxCount * 0.5) },
      { count: Math.floor(maxCount * 0.7) },
      { count: Math.floor(maxCount * 0.5) },
      { count: Math.floor(maxCount * 0.3) },
    ];

    return dataToRow;
  }
};
