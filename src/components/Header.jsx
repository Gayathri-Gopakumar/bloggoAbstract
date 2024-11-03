
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../store';
import { useTheme, useMediaQuery } from '@mui/material';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect screen width below 'sm' (600px)
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLoggedIN = useSelector((state) => state.isLoggedIN);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(190,29,253,1) 50%, rgba(252,176,69,1) 100%)'
      }}
    >
      <Toolbar>
        <Typography variant="h4">BLOGGO</Typography>

        {isMobile ? (
          // Show Drawer icon on mobile
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ marginLeft: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <Box width="250px" onClick={handleDrawerToggle}>
                <List>
                  {isLoggedIN && (
                    <>
                      <ListItem button component={Link} to="/blogs">
                        <ListItemText primary="All Blogs" />
                      </ListItem>
                      <ListItem button component={Link} to="/myblogs">
                        <ListItemText primary="My Blogs" />
                      </ListItem>
                      <ListItem button component={Link} to="/blogs/add">
                        <ListItemText primary="Add Your Blogs" />
                      </ListItem>
                    </>
                  )}
                  {!isLoggedIN ? (
                    <>
                      <ListItem button component={Link} to="/auth">
                        <ListItemText primary="Sign Up" />
                      </ListItem>
                      <ListItem button component={Link} to="/auth">
                        <ListItemText primary="Log In" />
                      </ListItem>
                    </>
                  ) : (
                    <ListItem
                      button
                      onClick={() => dispatch(authActions.logout())}
                      component={Link}
                      to="/auth"
                    >
                      <ListItemText primary="Log Out" />
                    </ListItem>
                  )}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          // Show Tabs and Buttons on Desktop
          <>
            <Box display="flex" marginLeft="auto">
              {isLoggedIN && (
                <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={(e, val) => setValue(val)}
                >
                  <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
                  <Tab LinkComponent={Link} to="/myblogs" label="My Blogs" />
                  <Tab LinkComponent={Link} to="/blogs/add" label="Add Your Blogs" />
                </Tabs>
              )}
            </Box>
            <Box display="flex" marginLeft="auto">
              {!isLoggedIN ? (
                <>
                  <Button
                    LinkComponent={Link}
                    to="/auth"
                    variant="contained"
                    sx={{ margin: 1 }}
                    color="light"
                  >
                    Sign Up
                  </Button>
                  <Button
                    LinkComponent={Link}
                    to="/auth"
                    variant="contained"
                    sx={{ margin: 1 }}
                    color="light"
                  >
                    Log In
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => dispatch(authActions.logout())}
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1 }}
                  color="light"
                >
                  Log Out
                </Button>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

