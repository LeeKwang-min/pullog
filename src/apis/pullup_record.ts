import { IPullupData } from "@/@types/pullup";
import { Database } from "@/@types/supabase";
import { createClient } from "@/lib/supabase/client";

export const getPullupRecord = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id || "";

  try {
    const { data: records, error: recordError } = await supabase
      .from("pullup_record")
      .select("*")
      .eq("user", userId);

    if (recordError) {
      throw recordError;
    }

    if (!records || records.length === 0) {
      console.log("No records found for this user");
      return null;
    }

    // 2. 조회된 기록의 id 목록 추출
    const recordIds = records.map((record) => record.id);

    // 3. pullup_set 테이블에서 기록 id에 해당하는 세트 조회
    const { data: sets, error: setError } = await supabase
      .from("pullup_set")
      .select("*")
      .in("record_id", recordIds);

    if (setError) {
      throw setError;
    }

    // 4. 조회된 데이터 반환
    return records.map((record) => {
      const filteredSets = sets.filter((set) => set.record_id === record.id);
      const setData = filteredSets.map((set) => ({
        count: set.count,
        second: set.second,
      }));
      return {
        date: record.date,
        day: record.day,
        setData: setData,
      };
    });
  } catch (e) {
    console.error("Error fetching data:", e);
    return null;
  }
};
