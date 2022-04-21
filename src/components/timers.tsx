import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { NightbotTimer } from "../models/timer";
import { getTimers } from "../repositories/nightbot";
import TimerItem from "./timerItem";

const Timers = () => {
  const [timers, setTimers] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      (async () => {
        let response = await getTimers(accessToken);
        setTimers(response);
        setLoading(false);
      })();
    }
  }, [])

  const renderMissingAccessToken = () => {
    return <div>{'Вы должны войти в приложение.'}</div>;
  }

  const renderLoading = () => {
    return <div>{'Подождите...'}</div>;
  }

  const renderError = () => {
    return <div>{'Произошла ошибка. Попробуйте обновить страницу.'}</div>;
  }

  return (
    !accessToken ? renderMissingAccessToken() :
      <>
        <Typography variant="h4">{'Timers'}</Typography>
        {loading ? renderLoading() :
          !(Boolean(timers) && Boolean(timers.timers)) ? renderError() :
            timers.timers.map((timer: NightbotTimer) => <TimerItem timer={timer} key={timer._id} />)}
      </>
  )
}

export default Timers;
