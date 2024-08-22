interface IProps {
  title: string;
  step?: 1 | 2 | 3 | 4 | 5;
}

function ScreenReaderTitle({ title, step = 1 }: IProps) {
  switch (step) {
    case 1:
      return <h1 className="blind">{title}</h1>;
    case 2:
      return <h2 className="blind">{title}</h2>;
    case 3:
      return <h3 className="blind">{title}</h3>;
    case 4:
      return <h4 className="blind">{title}</h4>;
    case 5:
      return <h5 className="blind">{title}</h5>;
    default:
      return <h1 className="blind">{title}</h1>;
  }
}

export default ScreenReaderTitle;
