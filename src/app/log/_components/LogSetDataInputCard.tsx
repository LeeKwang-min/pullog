import { RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ISPullupSetData } from "@/@types/pullup";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setPullupData: Dispatch<SetStateAction<ISPullupSetData[]>>;
  setNumber: number;
  count: number;
  second?: number | null;
}

function LogSetDataInputCard({
  setPullupData,
  setNumber,
  count,
  second,
}: IProps) {
  const deleteSet = (setNumber: number) => {
    setPullupData((prev) => prev.filter((_, i) => setNumber !== i));
  };

  const handleSetData = (key: string, setNumber: number, value: number) => {
    setPullupData((prev) => {
      return prev.map((item, i) => {
        if (setNumber === i)
          return {
            ...item,
            [key]: value,
          };
        else return item;
      });
    });
  };

  const refreshSetData = (setNumber: number) => {
    setPullupData((prev) => {
      return prev.map((item, i) => {
        if (setNumber === i)
          return {
            count: 0,
          };
        else return item;
      });
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">세트 {setNumber + 1}</Label>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refreshSetData(setNumber)}
            className="h-8 w-8"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => deleteSet(setNumber)}
            className="h-8 w-8"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor={`reps-${setNumber}`} className="sr-only">
            횟수
          </Label>
          <Input
            id={`reps-${setNumber}`}
            type="number"
            inputMode="numeric"
            pattern="^[0-9]*$"
            value={count || ""}
            onChange={(e) =>
              handleSetData("count", setNumber, Number(e.target.value))
            }
            onWheel={(e) => e.currentTarget.blur()}
            placeholder="횟수"
            className="w-full"
          />
        </div>
        <div>
          <Label htmlFor={`time-${setNumber}`} className="sr-only">
            시간(초)
          </Label>
          <Input
            id={`time-${setNumber}`}
            type="number"
            inputMode="numeric"
            pattern="^[0-9]*$"
            value={second || ""}
            onChange={(e) =>
              handleSetData("second", setNumber, Number(e.target.value))
            }
            onWheel={(e) => e.currentTarget.blur()}
            placeholder="시간(초)"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default LogSetDataInputCard;
