"use client";

import { cn } from "@/lib/utils";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useLongPress } from "use-long-press";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

function DayRecordSectionCard({ children, className }: IProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;

    try {
      const div = cardRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "record.png");
        }
      });
      toast("이미지 저장에 성공했어요!");
    } catch (error) {
      toast("이미지 저장에 실패했어요...");
      console.error("Error Occured : ", error);
    }
  };

  const bind = useLongPress(() => {
    handleDownloadCard();
  });

  return (
    <div
      ref={cardRef}
      {...bind()}
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
