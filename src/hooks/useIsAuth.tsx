"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

function useIsAuth() {
  // const supabase = createClient();
  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  // useEffect(() => {
  //   // 현재 세션 확인
  //   const checkAuthStatus = async () => {
  //     const { data } = await supabase.auth.getSession();
  //     setIsAuthenticated(!!data.session);
  //   };
  //   checkAuthStatus();
  //   // 세션 변화 감지
  //   const { data: authListener } = supabase.auth.onAuthStateChange(() => {
  //     checkAuthStatus();
  //   });
  //   return () => {
  //     authListener?.subscription.unsubscribe();
  //   };
  // }, []);
  // return {
  //   isAuthenticated,
  //   setIsAuthenticated,
  // };
}

export default useIsAuth;
