import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { IPullupData } from "@/@types/pullup";
import DayRecordSectionCard from "./DayRecordSectionCard";
import DayRecordSetList from "./DayRecordSetList";
import { ChartNoAxesCombinedIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import DayRecordStatisticsChart from "./DayRecordStatisticsChart";

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
      <h3 className="flex items-center gap-1 font-bold text-xl">
        오늘의 통계
        <ChartNoAxesCombinedIcon />
      </h3>
      <DayRecordStatisticsChart today={today} />
      <Separator className="h-1" />
      <DayRecordSetList today={today} />
    </DayRecordSectionCard>
  );
}

export default DayRecordStatistics;
