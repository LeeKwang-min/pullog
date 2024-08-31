import { IPullupData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { FlameIcon, TimerIcon } from "lucide-react";
import DayRecordSectionCard from "./DayRecordSectionCard";
import { findBestCountSetIdx } from "../_utils/dayRecord";
import { cn } from "@/lib/utils";

interface IProps {
  today: IPullupData;
}

function DayRecordSetList({ today }: IProps) {
  const bestIdx = findBestCountSetIdx(today.setData);

  return (
    <div className="flex flex-col gap-2">
      {today.setData.map((set, idx) => {
        const { count, second } = set;

        return (
          <div
            key={idx}
            className={cn(
              "w-full grid grid-cols-4 gap-2 border-2 rounded-md px-2 py-2",
              bestIdx === idx && "border-red-500"
            )}
          >
            <span className="font-semibold">{idx + 1} Set</span>
            <span className="flex items-center gap-1">
              <FlameIcon size={16} />
              <p className="min-w-4 font-semibold">{count}</p>
              <p>회</p>
            </span>
            <span className="flex items-center gap-1">
              <TimerIcon size={16} />
              <p className="min-w-4 font-semibold">{second}</p>
              <p>초</p>
            </span>
            {bestIdx === idx && (
              <span className="flex items-center text-red-500">
                <FlameIcon />
                <p>Best</p>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DayRecordSetList;
