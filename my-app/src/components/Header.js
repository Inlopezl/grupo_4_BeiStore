import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import "../css/main.css"
import logo from "../beistore-text.png"
import LaunchIcon from '@mui/icons-material/Launch';

function Header() {
    return (

        <header>
            
            <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="toolbar">
           <img src={logo}/>       
          <Button color="inherit" href="http://localhost:8080/"  className="exit" > <Box> <Typography variant="h7 "> <LaunchIcon/> Volver</Typography> </Box> </Button>
        </Toolbar>
      </AppBar>
    </Box>
              
        </header>
        
      );
}

export default Header