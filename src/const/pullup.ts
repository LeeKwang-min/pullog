import { IPullupData, TDayConst } from "@/@types/pullup";

export const TMP_PULLUP_DATA: IPullupData[] = Array.from(
  { length: 50 },
  (_, index) => {
    const dayNames: TDayConst[] = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ];
    const date = new Date();
    date.setDate(date.getDate() + index);
    const dayName = dayNames[date.getDay()];

    return {
      date: date.toISOString().split("T")[0],
      day: dayName,
      setData: [
        {
          id: 1,
          count: Math.floor(Math.random() * 20) + 1,
          time: {
            minute: Math.floor(Math.random() * 5),
            second: Math.floor(Math.random() * 60),
          },
        },
        {
          id: 2,
          count: Math.floor(Math.random() * 20) + 1,
          time: {
            minute: Math.floor(Math.random() * 5),
            second: Math.floor(Math.random() * 60),
          },
        },
      ],
      snsLink: {
        instar: "https://instagram.com/example",
        youtube: "https://youtube.com/example",
      },
    };
  }
);
