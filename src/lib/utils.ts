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
