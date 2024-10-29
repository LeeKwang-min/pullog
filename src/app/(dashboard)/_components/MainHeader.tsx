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
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

function MainHeader() {
  const supabase = createClient();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 현재 세션 확인
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };

    checkAuthStatus();

    // 세션 변화 감지
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkAuthStatus();
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleCalendarBtn = () => {
    router.push("/calendar");
  };

  const handleGooglLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
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
              {isAuthenticated ? (
                <Button variant="outline" onClick={handleLogout}>
                  로그아웃
                </Button>
              ) : (
                <Button
                  className="w-full flex items-center justify-center space-x-2"
                  onClick={handleGooglLogin}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google로 로그인</span>
                </Button>
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MainHeader;
