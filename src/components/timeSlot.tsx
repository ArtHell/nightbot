import { Button } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { NightbotTimer } from '../models/timer';
import { TimerDropResult } from '../models/timerDropResult'

interface Props {
  minute: number;
  timers: NightbotTimer[];
}

const TimeSlot = ({minute, timers}: Props) => {
  const [timer, setTimer] = useState<TimerDropResult>();

  const setValue = (item: TimerDropResult) => {
    setTimer(item);
    localStorage.setItem(`timer_id_${minute}`, item._id);
  }

  const [{ }, drop] = useDrop(() => ({
    accept: "timer",
    drop: (item: TimerDropResult, monitor) => setValue(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const clearTimeSlot = () => {
    setTimer(undefined);
    localStorage.removeItem(`timer_id_${minute}`);
  }

  useEffect(() => {
    const timerId = localStorage.getItem(`timer_id_${minute}`);
    if (timerId) {
      const savedTimer = timers && timers.filter(x => x._id === timerId)[0];
      if(savedTimer){
        setTimer({_id: savedTimer._id, name: savedTimer.name});
      } else {
        clearTimeSlot();
      }
    }
  }, [])

  return (
    <div ref={drop}>
      <Button onClick={clearTimeSlot} variant={timer ? 'contained' : 'outlined'} sx={{ minWidth: '128px'}}>{timer ? `${minute}: ${timer.name}` : `${minute}`}</Button>
    </div>
  )
}

export default TimeSlot;