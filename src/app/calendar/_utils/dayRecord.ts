import { ISPullupSetData } from "@/@types/pullup";

export const calcTodayTotalCount = (set: ISPullupSetData[]) => {
  return set.reduce((prev, set) => prev + set.count, 0);
};

export const calcTodayTotalTime = (set: ISPullupSetData[]) => {
  return set.reduce((prev, set) => prev + (set.second || 0), 0);
};

export const calcDiffBestCountBetweenSet = (
  prevSet: ISPullupSetData[],
  todaySet: ISPullupSetData[]
) => {
  const maxPrevCount = Math.max(...prevSet.map((set) => set.count));
  const maxTodayCount = Math.max(...todaySet.map((set) => set.count));
  return maxTodayCount - maxPrevCount;
};

export const calcDiffTotalCountBetweenSet = (
  prevSet: ISPullupSetData[],
  todaySet: ISPullupSetData[]
) => {
  const totalPrevCount = prevSet.reduce((prev, set) => prev + set.count, 0);
  const totalTodayCount = todaySet.reduce((prev, set) => prev + set.count, 0);
  return totalTodayCount - totalPrevCount;
};

export const getDiffCountWord = (diff: number) => {
  if (diff === 0) return "유지";
  if (diff < 0) return "감소";
  if (diff > 0) return "증가";
};
