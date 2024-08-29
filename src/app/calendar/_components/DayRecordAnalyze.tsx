import { IPullupData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import {
  calcDiffBestCountBetweenSet,
  calcDiffTotalCountBetweenSet,
  getDiffCountWord,
} from "../_utils/dayRecord";
import DayRecordSectionCard from "./DayRecordSectionCard";

interface IProps {
  today: IPullupData;
  prev: IPullupData;
}

function DayRecordAnalyze({ today, prev }: IProps) {
  return (
    <DayRecordSectionCard>
      <ScreenReaderTitle
        title="철봉 기록 달력 페이지 본문 - 선택한 날짜의 기록과 최근 입력된 기록 분석"
        step={3}
      />
      <h3 className="font-bold text-lg">오늘의 분석</h3>
      <div className="flex flex-col">
        <span>{`지난 기록(${prev.date}) 보다`}</span>
        <MaxCount today={today} prev={prev} />
        <TotalCount today={today} prev={prev} />
      </div>
    </DayRecordSectionCard>
  );
}

export default DayRecordAnalyze;

function MaxCount({ today, prev }: IProps) {
  const diffCount = calcDiffBestCountBetweenSet(prev.setData, today.setData);
  const diffCountWord = getDiffCountWord(diffCount);

  return (
    <span className="flex items-center gap-1">
      <p>최대 횟수가</p>
      <p>{`${diffCount}회`}</p>
      <p>
        {diffCountWord}
        했어요
      </p>
    </span>
  );
}

function TotalCount({ today, prev }: IProps) {
  const diffCount = calcDiffTotalCountBetweenSet(prev.setData, today.setData);
  const diffCountWord = getDiffCountWord(diffCount);

  return (
    <span className="flex items-center gap-1">
      <p>총 횟수가</p>
      <p>{`${diffCount}회`}</p>
      <p>
        {diffCountWord}
        했어요
      </p>
    </span>
  );
}
