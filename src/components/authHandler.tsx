import { Box, Button, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AuthHandler = () => {
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    if (location) {
      const searchParams = new URLSearchParams(location.hash.replace('#', ''));
      const accessToken = searchParams.get("access_token");
      if(accessToken) {
        localStorage.setItem("access_token", accessToken);
        setAccessToken(accessToken);
      }
    }
  }, [location])

  return (
    Boolean(accessToken) ?
    (<div>
      <span>{"Вы успешно авторизировались. Теперь вы можете использовать функциональность, расширяющую возможности официального сайта "}</span>
      <Link href='https://nightbot.tv/'>{'Nightbot'}</Link>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <Button href='/' color="inherit" variant="outlined">{'Перейти на главную'}</Button>
      </Box>
      
    </div>) :
    <div>{'Завершаем авторизацию...'}</div>
  );
}

export default AuthHandler;
