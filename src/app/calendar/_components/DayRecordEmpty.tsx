import { Grid2x2XIcon } from "lucide-react";

interface IProps {
  month: number;
  day: number;
}

function DayRecordEmpty({ month, day }: IProps) {
  return (
    <section className="w-full items-center flex flex-col gap-2">
      <Grid2x2XIcon size={100} color="#64748b" />
      <span className="text-slate-500 flex items-center">
        <p className="font-bold text-slate-600">{`${month}월 ${day}일`}</p>은
        운동을 하지 않았어요`
      </span>
    </section>
  );
}

export default DayRecordEmpty;
