import { cn } from "@/lib/utils";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

function DayRecordSectionCard({ children, className }: IProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-2 aspect-square border-2 rounded-md px-2 py-2 justify-between",
        className
      )}
    >
      {children}
    </div>
  );
}

export default DayRecordSectionCard;
