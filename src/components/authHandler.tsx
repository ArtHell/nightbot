import { Box, Button, Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthHandler = () => {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if(token) {
      setAccessToken(token);
    }
    if (location && location.hash) {
      const searchParams = new URLSearchParams(location.hash.replace('#', ''));
      const accessToken = searchParams.get("access_token");
      if(accessToken) {
        localStorage.setItem("access_token", accessToken);
        setAccessToken(accessToken);
      }
    }
  }, [location])

  const renderMissingAccessToken = () => {
    return <Typography variant="body1">{'Вы должны войти в приложение.'}</Typography>;
  }

  return (Boolean(accessToken) ? <Navigate replace to="/timers" /> : renderMissingAccessToken())
}

export default AuthHandler;
