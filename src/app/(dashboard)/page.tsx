import { getPullupRecordSever } from "@/apis/pullup_record";
import ChartSection from "./_components/ChartSection";
import CountSection from "./_components/CountSection";
import MainHeader from "./_components/MainHeader";
import TableSection from "./_components/TableSection";

async function Dashboard() {
  const pullupData = await getPullupRecordSever();
  // const pullupData = [];

  return (
    <section className="w-full h-full flex flex-col px-4 py-4 gap-4">
      <MainHeader />
      <CountSection pullupData={pullupData.length > 0 ? pullupData : []} />
      <ChartSection pullupData={pullupData.length > 0 ? pullupData : []} />
      <TableSection pullupData={pullupData.length > 0 ? pullupData : []} />
    </section>
  );
}

export default Dashboard;
