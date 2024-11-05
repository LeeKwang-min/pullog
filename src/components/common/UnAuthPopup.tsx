"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useIsAuth from "@/hooks/useIsAuth";
import { createClient } from "@/lib/supabase/client";
import { Calendar, BookMarked } from "lucide-react";

function UnAuthPopup() {
  const supabase = createClient();
  const { isAuthenticated } = useIsAuth();

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      },
    });
  };

  if (isAuthenticated) return null;

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-none shadow-lg animate-fade-down">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold text-blue-600">
          지금은 임시 데이터에요! 👋
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="bg-white rounded-lg p-4 shadow-inner text-center">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">
            로그인 후 이용 가능한 기능
          </h3>
          <ul className="space-y-2">
            <ListItem icon={<Calendar className="h-5 w-5 text-green-500" />}>
              개인 기록 비교, 분석, 통계
            </ListItem>
            <ListItem icon={<BookMarked className="h-5 w-5 text-blue-500" />}>
              턱걸이 기록을 저장하고 확인해요
            </ListItem>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGoogleLogin}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          지금 바로 시작하기 🚀
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UnAuthPopup;

function ListItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-700 text-xs">{children}</span>
    </li>
  );
}
