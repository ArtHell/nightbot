import { NightbotTimer } from "../models/timer";

interface Props {
  timer: NightbotTimer;
}

const TimerItem = ({ timer }: Props) => {
  return (
    <div>
      <div>{timer._id}</div>
      <div>{timer.enabled}</div>
      <div>{timer.interval}</div>
      <div>{timer.lines}</div>
      <div>{timer.message}</div>
      <div>{timer.name}</div>
      <div>{(new Date(timer.createdAt)).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</div>
    </div>

  );
}

export default TimerItem;