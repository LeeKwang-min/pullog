import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { calcTotalCount, calcTotalTime } from "../_utils/dayRecord";
import { IPullupData } from "@/@types/pullup";
import DayRecordSectionCard from "./DayRecordSectionCard";

interface IProps {
  today: IPullupData;
}

function DayRecordStatistics({ today }: IProps) {
  return (
    <DayRecordSectionCard>
      <ScreenReaderTitle
        title="철봉 기록 달력 페이지 본문 - 선택한 날짜의 기록 통계"
        step={3}
      />
      <h3 className="font-bold text-lg">오늘의 통계</h3>
      <div>
        <span>오늘 수행한 총 횟수: {calcTotalCount(today.setData)} 회</span>
      </div>
      <div>
        <TotalTime today={today} />
      </div>
    </DayRecordSectionCard>
  );
}

export default DayRecordStatistics;

function TotalTime({ today }: IProps) {
  const totalSecond = calcTotalTime(today.setData);

  return (
    <span className="flex items-center gap-1">
      오늘 들인 총 시간:
      <p>{Math.floor(totalSecond / 60)} 분</p>
      <p>{totalSecond % 60} 초</p>
    </span>
  );
}
