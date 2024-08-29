"use client";

import { ISPullupSetData } from "@/@types/pullup";
import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { ChevronLeftIcon, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
  pullupData: ISPullupSetData[];
}

function LogHeader({ pullupData }: IProps) {
  const router = useRouter();

  const handleSaveData = () => {
    // 1. 저장 validation (number 체크, 값 입력 체크 등등)
    // 2. validation fail시 알림 띄우기
    // 3. 서버에 데이터 저장
    // 4. 저장 완료 알림 후 logCalendar로 이동
    console.log(pullupData);
    router.push("/calendar");
  };

  const handleBackBtn = () => {
    router.back();
  };

  return (
    <div className="w-full flex items-center justify-between">
      <ScreenReaderTitle title="철봉 기록 입력 페이지 헤더" step={2} />
      <ChevronLeftIcon size={24} onClick={() => handleBackBtn()} />
      <h3 className="font-bold">풀업 기록</h3>
      <SaveIcon size={24} onClick={() => handleSaveData()} />
    </div>
  );
}

export default LogHeader;
