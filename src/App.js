import React, { useState } from 'react';
import Department from './page/department';
import Device from './page/device';
import Employee from './page/employee';
import LogReport from './page/logreport'
import Login from './login'
import CustomPermission from './page/customperm'
import Approval1 from './page/approval'
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Collapse, ListItemIcon, Container, Box } from '@mui/material';
import { ExpandLess, ExpandMore, Dashboard, Devices, People, ListAlt, Settings, Approval } from '@mui/icons-material';
import { Route, Routes, Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import BusinessSharpIcon from '@mui/icons-material/BusinessSharp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Logo from './logo.png'
import LockIcon from '@mui/icons-material/Lock'
import Profile from './profile.jpg'



const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // Warna utama
    },
    secondary: {
      main: '#f50057', // Warna aksen sekunder
    },
    background: {
      default: '#fffff', // Background umum aplikasi
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Font keluarga yang digunakan
    h4: {
      fontWeight: 'bold',
      color: '#333', // Warna teks header
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#555', // Warna teks konten
    },
  },
  spacing: 8, // Ukuran default spacing
});

const App = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openManagement, setOpenManagement] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);

  const handleManagementClick = () => {
    setOpenManagement(!openManagement);
  };

  const handlePermissionClick = () => {
    setOpenPermission(!openPermission);
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', marginTop: '80px' }}>

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              mt: '70px', 
              backgroundColor: '#fff', // Background sidebar
              borderRight: '1px solid #e0e0e0', // Garis pembatas sidebar
            },
          }}
        >
          <List>
          <ListItem button component={RouterLink} to="/">
  <ListItemIcon>
    <Dashboard style={{ color: '414141' }} />
  </ListItemIcon>
  <ListItemText primary="Dashboard" />
</ListItem>

            {/* Management */}
            <ListItem button onClick={handleManagementClick}>
              <ListItemIcon>
                <Settings style={{ color: '414141' }} />
              </ListItemIcon>
              <ListItemText primary="Management" />
              {openManagement ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openManagement} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem component={RouterLink} to="/device" button sx={{ pl: 4 }}>
                  <ListItemIcon>
                  <Devices style={{ color: '#414141' }} />

                  </ListItemIcon>
                  <ListItemText primary="Device" />
                </ListItem>
                <ListItem component={RouterLink} to="/department" button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <BusinessSharpIcon style={{ color:'414141' }} />
                  </ListItemIcon>
                  <ListItemText primary="Department" />
                </ListItem>
                <ListItem component={RouterLink} to="/employee" button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <People style={{ color:'414141' }} />
                  </ListItemIcon>
                  <ListItemText primary="Employee" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem  component={RouterLink} to="/logreport" button>
              <ListItemIcon>
                <ListAlt style={{ color: '414141'}} />
              </ListItemIcon>
              <ListItemText primary="Log Report" />
            </ListItem>

            <ListItem button onClick={handlePermissionClick}>
              <ListItemIcon>
                <Settings style={{ color: '414141' }} />
              </ListItemIcon>
              <ListItemText primary="Permission" />
              {openPermission ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openPermission} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
  <ListItem component={RouterLink} to="/approval" button sx={{ pl: 4 }}>
    <ListItemIcon>
      <CheckCircleIcon style={{  color: '414141' }} />
    </ListItemIcon>
    <ListItemText primary="Approval" />
  </ListItem>
  <ListItem component={RouterLink} to="/customperm" button sx={{ pl: 4 }}>
    <ListItemIcon>
      <LockIcon style={{ color: '414141' }}/>
    </ListItemIcon>
    <ListItemText primary="Custom Permission" />
  </ListItem>
</List>
            </Collapse>
          </List>
        </Drawer>

        {/* Navbar */}
        <div style={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 20,backgroundColor: "#0C090A"
 }}>
            <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
  <img src={Logo} style={{ height: '40px' }}/>
</Typography>
              <Button
                color="inherit"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
               <img src={Profile} style={{ width: 40, height: 40, borderRadius: '50%' }} />

              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          {/* Main content */}
          <div style={{ padding: 16, marginTop: '10px' }}>
            <Container sx={{ flex: 1 }}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Box>
                      <Typography variant="h4" gutterBottom>
                        Selamat Datang di Website Kami
                      </Typography>
                    </Box>
                  }
                />
                <Route path="/device" element={<Device />} />
                <Route path="/department" element={<Department />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/logreport" element={<LogReport />} />
                <Route path="/customperm" element={<CustomPermission />} />
                <Route path="/approval" element={<Approval1 />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Container>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
