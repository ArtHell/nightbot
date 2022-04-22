import MenuIcon from "@mui/icons-material/MenuOutlined";
import { Box, AppBar as AppBarMui, Toolbar, IconButton, Typography, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthLink } from "../helpers/authHelper";
import { revokeToken } from "../repositories/nightbot";

const AppBar = () => {
  const navigate = useNavigate();
  const redirectUrl = window.location.href.split(window.location.origin)[1].includes('nightbot') ? window.location.origin + '/nightbot' : window.location.origin;
  const authLink = getAuthLink(redirectUrl);
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if(token) {
      setAccessToken(token);
    }
  }, []);

  const logout = async () => {
    if(accessToken){
      await revokeToken(accessToken);
      setAccessToken(undefined);
      navigate('/logout', {replace: true});
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarMui position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/nightbot" sx={{ textDecoration: 'none', boxShadow: 'none', color: 'inherit' }}>
              {'Nightbot Enhanced UI'}
            </Link>
          </Typography>
          {accessToken ? <Button onClick={logout} color="inherit">{'Выйти'}</Button> : <Button href={authLink} color="inherit">{'Войти'}</Button>}
          
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}

export default AppBar;
