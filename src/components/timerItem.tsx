import { Button } from "@mui/material";
import { useDrag } from "react-dnd";
import { NightbotTimer } from "../models/timer";
import { TimerDropResult } from "../models/timerDropResult";

interface Props {
  timer: NightbotTimer;
}

const TimerItem = ({ timer }: Props) => {
  const [{ }, drag] = useDrag(() => ({
    type: 'timer',
    item: { _id: timer._id, name: timer.name } as TimerDropResult,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
  }))

  return (
    <div ref={drag}>
      <Button variant="outlined" sx={{minWidth: '128px'}}>{timer.name}</Button>
    </div>

  );
}

export default TimerItem;