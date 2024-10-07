"use client";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IPullupData } from "@/@types/pullup";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface IRow {
  date: string;
  set: number;
  count: number;
}

interface IProps {
  pullupData: IPullupData[];
}

function TableSection({ pullupData }: IProps) {
  const [records, setRecords] = useState<IRow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const dataToRow = pullupData.map((data) => {
      return {
        date: data.date,
        set: data.setData.length,
        count: data.setData.reduce((prev, next) => prev + next.count, 0),
      };
    });

    setRecords(dataToRow);
  }, [pullupData]);

  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Card className="mb-2">
      <CardHeader>
        <CardTitle className="text-lg flex flex-col gap-1">
          <span>일별 기록</span>
          {records.length > 0 && (
            <>
              <span className="text-sm text-gray-500">{`기록 횟수: ${records.length}회`}</span>
              <span className="text-sm text-gray-400">{`기록일: ${
                records[records.length - 1].date
              } ~ ${records[0].date}`}</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="border">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-center border-r h-9">날짜</TableHead>
              <TableHead className="text-center border-r h-9">세트</TableHead>
              <TableHead className="text-center border-r h-9">횟수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.length > 0 ? (
              currentRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center border-r text-gray-700 px-4 py-2">
                    {record.date}
                  </TableCell>
                  <TableCell className="text-center border-r text-gray-700 px-4 py-2">
                    {record.set}
                  </TableCell>
                  <TableCell className="text-center border-r text-gray-700 px-4 py-2">
                    {record.count}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <svg
                      className="w-12 h-12 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                      d
                    </svg>
                    <p className="text-lg font-semibold">
                      입력된 데이터가 없습니다.
                    </p>
                    <p className="text-sm">새로운 운동 기록을 추가해 주세요.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* 페이지네이션 */}
        {records.length > 0 && (
          <div className="flex items-center justify-between space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              이전
            </Button>
            <span className="text-sm text-gray-400">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TableSection;
