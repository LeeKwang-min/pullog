"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ScreenReaderTitle from "@/components/common/ScreenReaderTitle";
import { CalendarDaysIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoImg from "@/assets/images/pullog_logo.jpeg";

function MainHeader() {
  const router = useRouter();

  const handleCalendarBtn = () => {
    router.push("/calendar");
  };

  return (
    <div className="w-full flex items-center justify-between">
      <ScreenReaderTitle title="Pullog 메인 페이지 헤더" step={2} />
      <CalendarDaysIcon size={24} onClick={() => handleCalendarBtn()} />
      <h3 className="font-bold">대시보드</h3>
      <Sheet>
        <SheetTrigger>
          <div className="relative w-6 h-6 rounded-md border">
            <Image src={LogoImg} fill alt="풀로그 로고 이미지" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>내정보</SheetTitle>
            <SheetDescription>
              이런 저런 내용들이 들어갈 예정입니다.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MainHeader;
