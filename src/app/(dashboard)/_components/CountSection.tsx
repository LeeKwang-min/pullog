"use client";
import { useEffect, useState } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { IPullupData } from "@/@types/pullup";

interface ICount {
  total: number;
  set: number;
}

interface IProps {
  pullupData: IPullupData[];
}

function CountSection({ pullupData }: IProps) {
  const [totalCount, setTotalCount] = useState<ICount>({
    total: 0,
    set: 0,
  });

  useEffect(() => {
    const totalCount = pullupData
      .map((data) => data.setData.reduce((prev, next) => prev + next.count, 0))
      .reduce((prev, next) => prev + next, 0);
    const totalSet = pullupData.reduce(
      (prev, next) => prev + next.setData.length,
      0
    );

    setTotalCount({
      total: totalCount,
      set: totalSet,
    });
  }, [pullupData]);

  return (
    <Card className="mt-4 mb-2 bg-gradient-to-r from-blue-400 to-green-500 text-white overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">
              현재까지 총 횟수
            </CardTitle>
            <div className="text-3xl font-bold transition-all duration-300 ease-out">
              {Math.round(totalCount.total).toLocaleString()}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <CardTitle className="text-sm font-medium">세트별 평균</CardTitle>
            <div className="text-3xl font-bold transition-all duration-300 ease-out">
              {totalCount.total > 0
                ? (totalCount.total / totalCount.set).toFixed(1)
                : 0}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CountSection;
