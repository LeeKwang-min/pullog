export type TDayConst =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export type TPullupSnsLink = {
  instar?: string;
  youtube?: string;
};

export interface ISPullupSetData {
  id?: number;
  count: number;
  minute?: number;
  second?: number;
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
