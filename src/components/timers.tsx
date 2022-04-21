import { Box, Button, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { NightbotTimer } from "../models/timer";
import { getTimers, saveTimer } from "../repositories/nightbot";
import TimerItem from "./timerItem";
import TimeSlot from "./timeSlot";

const Timers = () => {
  const [timers, setTimers] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setAccessToken(accessToken);
      (async () => {
        let response = await getTimers(accessToken);
        setTimers(response);
        setLoading(false);
      })();
    }
  }, [])

  const renderMissingAccessToken = () => {
    return <Typography variant="body1">{'Вы должны войти в приложение.'}</Typography>;
  }

  const renderLoading = () => {
    return <Typography variant="body1">{'Подождите...'}</Typography>;
  }

  const renderError = () => {
    return <Typography variant="body1">{'Произошла ошибка. Попробуйте обновить страницу.'}</Typography>;
  }

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (var i = 0; i < 60; i += 5) {
      timeSlots.push(<TimeSlot key={i} minute={i} timers={timers.timers} />);
    }
    return timeSlots;
  }

  const saveTimers = () => {
    const savedTimers: any = {};
    for(var i = 0; i < 60; i++) {
      const savedTimer = localStorage.getItem(`timer_id_${i}`);
      if(savedTimer){
        savedTimers[savedTimer] = savedTimers[savedTimer] ? `${savedTimers[savedTimer]},${i}` : i.toString();
      }
    }
    timers.timers.map((timer: NightbotTimer) => {
      const timerMinutes = savedTimers[timer._id];
      if(timerMinutes && accessToken) {
        timer.interval = `${timerMinutes} * * * *`;
        saveTimer(timer, accessToken);
      }
    });
  }

  const renderTimers = (timers: NightbotTimer[]) => {
    return <>
      <Container sx={{ display: 'flex', gap: '20px', padding: '20px', flexWrap: 'wrap' }}>
        {timers.map((timer: NightbotTimer) => <TimerItem timer={timer} key={timer._id} />)}
      </Container>
      <Typography variant="h4">{'Слоты времени'}</Typography>
      <Container sx={{ display: 'flex', gap: '20px', padding: '20px', flexWrap: 'wrap' }}>
        {renderTimeSlots()}
        <Box sx={{flexBasis: '100%'}}>
          <Button onClick={saveTimers} variant={'contained'} sx={{ minWidth: '128px' }}>{'Сохранить'}</Button>
        </Box>

        <Typography variant="body1">{'Перетаскивайте таймеры на нужные слоты и не забудьте сохранить. Нажмите на занятый слот, чтобы очистить его.'}</Typography>
        <Typography variant="caption">{'После перезагрузки страницы слоты будут отображаться пустыми, но на самом деле все значения сохранены. Также возможны ошибки в отображении интервалов таймеров в Nightbot.tv, потому что они поддерживают только ограниченный функционал.'}</Typography>
        <Typography variant="caption">{'Перетаскивание работает с телефона тоже, но не отображается перетягиваемый компонент.'}</Typography>
        <Typography variant="caption">{'Рекомендуется Выйти из приложения после внесения изменений, чтобы никто не смог воспользоваться вашим токеном. Вы всегда сможете быстро войти снова.'}</Typography>
      </Container>
    </>
  }

  return (
    !accessToken ? renderMissingAccessToken() :
      <>
        <Typography variant="h4">{'Таймеры'}</Typography>
        {loading ? renderLoading() :
          !(Boolean(timers) && Boolean(timers.timers)) ? renderError() : renderTimers(timers.timers)}
      </>
  )
}

export default Timers;
