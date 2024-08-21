interface IProps {
  params: {
    loggingDay: string[];
  };
}

function LogPullupDay({ params }: IProps) {
  const { loggingDay } = params;
  const [month, day] = loggingDay;
  // 달, 날짜 잘못 입력시 돌려 보내기
  // or 페이지 자체를 log/[month]/[day] 형식으로 만드는것도 방법이긴 한데... 뭐가 나을지는 고민해 볼 것

  return (
    <div>
      <span>달: {month}</span>
      <span>날짜: {day}</span>
    </div>
  );
}

export default LogPullupDay;
