import { IPullupData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { FlameIcon } from "lucide-react";
import DayRecordSectionCard from "./DayRecordSectionCard";

interface IProps {
  today: IPullupData;
}

function DayRecordSetList({ today }: IProps) {
  return (
    <DayRecordSectionCard>
      <ScreenReaderTitle
        title="철봉 기록 달력 페이지 본문 - 선택한 날짜의 기록 리스트"
        step={3}
      />
      <h3 className="font-bold text-lg">오늘의 기록</h3>
      {today.setData.map((set, idx) => {
        const { count, second } = set;

        return (
          <div
            key={idx}
            className="flex items-center gap-5 border rounded-md px-2 py-1"
          >
            <span>{idx + 1} 세트</span>
            <span className="flex gap-2">
              <p>{count} 회</p>
              <p>-</p>
              <p> {second} 초</p>
            </span>
            {/* 최고 세트 표시해 주는 UI 있으면 좋을듯 */}
            {idx === 0 && (
              <span className="flex items-center text-red-500">
                <FlameIcon />
                <p>Best</p>
              </span>
            )}
          </div>
        );
      })}
    </DayRecordSectionCard>
  );
}

export default DayRecordSetList;
