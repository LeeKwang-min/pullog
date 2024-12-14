"use client";

import { IPullupData } from "@/@types/pullup";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useIsAuth from "@/hooks/useIsAuth";
import { findMaxCount, getRecommendSet } from "@/lib/utils";
import { Dumbbell, InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IRow {
  set: number;
  count: number;
}

interface IProps {
  pullupData: IPullupData[];
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function RecommendSetTable({ pullupData, date, setDate }: IProps) {
  const router = useRouter();
  const { isAuthenticated } = useIsAuth();

  const [records, setRecords] = useState<IRow[]>([]);
  const maxCount = findMaxCount(pullupData) || 3;

  const handleRecordBtn = () => {
    setDate(date);
    if (isAuthenticated) router.push(`/log?maxCount=${maxCount}`);
    else router.push(`/log/unauth?maxCount=${maxCount}`);
  };

  useEffect(() => {
    const dataToRow = getRecommendSet(maxCount);
    setRecords(dataToRow);
  }, [maxCount, pullupData]);

  return (
    <div>
      <Table className="border">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-center border-r h-9">세트</TableHead>
            <TableHead className="text-center border-r h-9">횟수</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="text-center border-r text-gray-700 px-4 py-2">
                {record.set}
              </TableCell>
              <TableCell className="text-center border-r text-gray-700 px-4 py-2">
                {record.count}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-1 mt-4">
        <span className="text-gray-500 text-sm font-bold">추천 세트는...</span>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <InfoIcon size={12} />
          {`기록된 최대 횟수(${maxCount}회)를 기반으로 계산되었어요.`}
        </span>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <InfoIcon size={12} />
          휴식 시간은 1분을 추천해요.
        </span>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <InfoIcon size={12} />주 1회 최대 횟수를 측정해 보세요.
        </span>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <InfoIcon size={12} />
          피라미드 방식을 기반으로 계산되었어요.
        </span>
        <span className="text-gray-500 text-xs flex items-center gap-1">
          <InfoIcon size={12} />
          만약 수행 횟수가 적다면 밴드를 사용해 보세요!
        </span>
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={handleRecordBtn} className="flex items-center gap-2">
          <Dumbbell className="w-4 h-4" />
          추천 세트로 운동하기
        </Button>
      </div>
    </div>
  );
}

export default RecommendSetTable;
