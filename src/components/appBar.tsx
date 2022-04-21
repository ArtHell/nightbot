import MenuIcon from "@mui/icons-material/MenuOutlined";
import { Box, AppBar as AppBarMui, Toolbar, IconButton, Typography, Button, Link } from "@mui/material";
import { getAuthLink } from "../helpers/authHelper";

const AppBar = () => {
  const redirectUrl = window.location.origin + '/callback';
  const authLink = getAuthLink(redirectUrl);

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
            <Link href="/" sx={{ textDecoration: 'none', boxShadow: 'none', color: 'inherit' }}>
              {'Nightbot Enhanced UI'}
            </Link>
          </Typography>
          <Button href={authLink} color="inherit">{'Login'}</Button>
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}

export default AppBar;