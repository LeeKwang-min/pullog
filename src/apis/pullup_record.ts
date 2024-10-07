import { IPullupData } from "@/@types/pullup";
import { Database } from "@/@types/supabase";
import { createClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { format } from "date-fns";

type TTable = Database["public"]["Tables"];
type TPullupRecord = TTable["pullup_record"]["Row"];
type TPullupSet = TTable["pullup_set"]["Row"];

const handleDataForClient = (records: TPullupRecord[], sets: TPullupSet[]) => {
  return records.map((record) => {
    const filteredSets = sets.filter((set) => set.record_id === record.id);
    const setData = filteredSets.map((set) => ({
      count: set.count,
      second: set.second,
    }));
    return {
      id: record.id,
      date: record.date,
      day: record.day,
      setData: setData,
    };
  });
};

export const getPullupRecord = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id || "";

  try {
    const { data: records, error: recordError } = await supabase
      .from("pullup_record")
      .select("*")
      .eq("user_id", userId)
      .order("date");

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
    return handleDataForClient(records, sets);
  } catch (e) {
    console.error("Error fetching data:", e);
    return null;
  }
};

export const getPullupRecordSever = async () => {
  const supabase = await createServerClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id || "";

  try {
    const { data: records, error: recordError } = await supabase
      .from("pullup_record")
      .select("*")
      .eq("user_id", userId)
      .order("date", {
        ascending: false,
      });

    if (recordError) {
      throw recordError;
    }

    if (!records || records.length === 0) {
      console.log("No records found for this user");
      return [];
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
    return handleDataForClient(records, sets) as IPullupData[];
  } catch (e) {
    console.error("Error fetching data:", e);
    return [];
  }
};

export const getDayPullupRecord = async (date: Date) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id || "";

  const curDate = format(date, "yyyy-MM-dd");

  try {
    const { data: records, error: recordError } = await supabase
      .from("pullup_record")
      .select("*")
      .eq("user_id", userId)
      .eq("date", curDate)
      .order("date");

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
    return handleDataForClient(records, sets);
  } catch (e) {
    console.error("Error fetching data:", e);
    return null;
  }
};

export const upsertPullupRecord = async (data: IPullupData) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id || "";

  const { data: recordData, error: recordError } = await supabase
    .from("pullup_record")
    .select("id")
    .eq("user_id", userId)
    .eq("date", data.date)
    .single();

  let recordId: number;

  // PGRST116 => "code": "PGRST116", "details": "The result contains 0 rows"
  if (recordError && recordError.code !== "PGRST116") {
    // 조회 중 다른 에러가 발생한 경우 처리
    console.error("Error fetching pullup_record:", recordError);
    return null;
  }

  if (!recordData) {
    // 2. 기록이 없으면 새로운 pullup_record 생성 (Insert)
    const { data: insertRecord, error: insertError } = await supabase
      .from("pullup_record")
      .insert([{ user_id: userId, date: data.date, day: data.day }])
      .select("id")
      .single();

    if (insertError) {
      console.error("Error inserting pullup_record:", insertError);
      return null;
    }
    recordId = insertRecord.id;
  } else {
    // 3. 기존 기록이 있으면 해당 id를 사용 (Update)
    recordId = recordData.id;

    // 4. 기존 pullup_set 데이터 삭제
    const { error: deleteError } = await supabase
      .from("pullup_set")
      .delete()
      .eq("user_id", userId)
      .eq("record_id", recordId);

    if (deleteError) {
      console.error("Error deleting pullup_set:", deleteError);
      return null;
    }
  }

  // 5. 새로운 setData 삽입 (Insert)
  const setsToInsert = data.setData.map((set) => ({
    record_id: recordId,
    ...set,
  }));

  const { data: insertData, error: insertSetError } = await supabase
    .from("pullup_set")
    .insert(setsToInsert)
    .select();

  if (insertSetError) {
    console.error("Error inserting pullup_set:", insertSetError);
    return null;
  }

  return insertData;
};

export const delPullupRecord = async (id: number) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user?.id || "";

  try {
    const { error } = await supabase
      .from("pullup_record")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error delete data:", error);
    return null;
  }

  return "delete success";
};
