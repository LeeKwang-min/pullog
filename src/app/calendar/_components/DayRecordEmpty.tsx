"use client";
import { CalendarX2, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import useIsAuth from "@/hooks/useIsAuth";

interface IProps {
  date: Date;
  month: number;
  day: number;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function DayRecordEmpty({ month, day, date, setDate }: IProps) {
  const router = useRouter();
  const { isAuthenticated } = useIsAuth();

  const handleRecordBtn = () => {
    setDate(date);
    if (isAuthenticated) router.push("/log");
    else router.push("/log/unauth");
  };

  return (
    <Card className="w-full  mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">
          {`${month}월 ${day}일`} 운동 기록
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <CalendarX2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-lg mb-2">이 날은 운동을 하지 않았어요.</p>
        <p className="text-sm text-gray-500">
          하지만 괜찮아요! 언제든 기록할 수 있습니다.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleRecordBtn} className="flex items-center">
          <Dumbbell className="w-4 h-4 mr-2" />
          운동 기록하기
        </Button>
      </CardFooter>
    </Card>
  );
}

export default DayRecordEmpty;
