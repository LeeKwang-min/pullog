export type TDayConst =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type TPullupSnsLink = {
  instagram?: string;
  youtube?: string;
};

export interface ISPullupSetData {
  id?: number;
  count: number;
  second?: number | null;
}

export interface IPullupData {
  id?: number;
  date: string;
  day: TDayConst;
  setData: ISPullupSetData[];
  snsLink?: string;
}

export interface IGetPullupResponse {
  status: number;
  data: IPullupData[];
}

export interface IPullupDataWithPrev {
  today: IPullupData | null;
  prev: IPullupData | null;
}
