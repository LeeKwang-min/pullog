import { ISPullupSetData } from "@/@types/pullup";

export const calcMaxCount = (set: ISPullupSetData[]) => {
  return Math.max(...set.map((setData) => setData.count));
};

export const calcMaxTime = (set: ISPullupSetData[]) => {
  return Math.max(...set.map((setData) => setData.second || 0));
};

export const calcTotalCount = (set: ISPullupSetData[]) => {
  return set.reduce((prev, set) => prev + set.count, 0);
};

export const calcTotalTime = (set: ISPullupSetData[]) => {
  return set.reduce((prev, set) => prev + (set.second || 0), 0);
};

export const calcDiffBestCountBetweenSet = (
  prevSet: ISPullupSetData[],
  todaySet: ISPullupSetData[]
) => {
  const maxPrevCount = calcMaxCount(prevSet);
  const maxTodayCount = calcMaxCount(todaySet);
  return maxTodayCount - maxPrevCount;
};

export const calcDiffTotalCountBetweenSet = (
  prevSet: ISPullupSetData[],
  todaySet: ISPullupSetData[]
) => {
  const totalPrevCount = calcTotalCount(prevSet);
  const totalTodayCount = calcTotalCount(todaySet);
  return totalTodayCount - totalPrevCount;
};

export const getDiffCountWord = (diff: number) => {
  if (diff === 0) return "유지";
  if (diff < 0) return "감소";
  if (diff > 0) return "증가";
};

export const getChartColor = (diff: number) => {
  if (diff === 0) return "#16a34a";
  if (diff < 0) return "#f87171";
  if (diff > 0) return "#2563eb";
};
