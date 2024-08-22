export type TDayConst =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type TPullupSetTime = {
  minute: number;
  second: number;
};

export type TPullupSnsLink = {
  instar?: string;
  youtube?: string;
};

export interface ISPullupSetData {
  id?: number;
  set: number;
  count: number;
  time?: TPullupSetTime;
}

export interface IPullupData {
  date: string;
  day: TDayConst;
  setData: ISPullupSetData[];
  snsLink?: TPullupSnsLink;
}

export interface IGetPullupResponse {
  status: number;
  data: IPullupData[];
}
