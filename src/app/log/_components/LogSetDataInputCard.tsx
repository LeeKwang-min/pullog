import { ISPullupSetData } from "@/@types/pullup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCcwIcon, Trash2Icon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  setPullupData: Dispatch<SetStateAction<ISPullupSetData[]>>;
  setNumber: number;
  count: number;
  second?: number;
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
    <div className="flex flex-col gap-2 w-full border py-2 px-2 rounded-md">
      <div className="grid grid-cols-6 items-center">
        <Label
          htmlFor={`${setNumber + 1}set`}
          className="text-sm font-semibold"
        >
          {setNumber + 1} 세트
        </Label>
        <Input
          id={`${setNumber + 1}set`}
          type="number"
          value={count || ""}
          onChange={(e) =>
            handleSetData("count", setNumber, Number(e.target.value))
          }
          className="h-8 text-sm col-span-2"
        />
        <Label
          htmlFor={`${setNumber + 1}set`}
          className="text-sm font-semibold px-2"
        >
          회
        </Label>
      </div>

      <div className="grid grid-cols-6 items-center">
        <Label
          htmlFor={`${setNumber + 1}setSec`}
          className="text-sm font-semibold"
        >
          시간
        </Label>
        <Input
          id={`${setNumber + 1}setSec`}
          type="number"
          value={second || ""}
          onChange={(e) =>
            handleSetData("second", setNumber, Number(e.target.value))
          }
          className="h-8 text-sm col-span-2"
        />
        <Label
          htmlFor={`${setNumber + 1}setSec`}
          className="text-sm font-semibold px-2"
        >
          초
        </Label>

        <div className="flex items-center gap-2 col-span-2 justify-end">
          <button
            onClick={() => refreshSetData(setNumber)}
            className="rounded-full border px-1 py-1"
          >
            <RefreshCcwIcon color="#71b0c2" size={18} />
          </button>
          <button
            onClick={() => deleteSet(setNumber)}
            className="rounded-full border px-1 py-1"
          >
            <Trash2Icon color="#ff8585" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogSetDataInputCard;
