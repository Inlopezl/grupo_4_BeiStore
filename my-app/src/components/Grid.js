import React from 'react'
import FetchProducts from "./FetchProducts"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { height } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function Maingrid() {
    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                
                <Grid item><Paper boxshadow={1} border={5} elevation={3} sx={{height: 500 ,  width: 500 }}> <FetchProducts/> </Paper>  </Grid>
                
                <Grid item><Paper boxshadow={1} border={5} elevation={3} sx={{height: 500 ,  width: 500 }}>  </Paper>  </Grid>
                
                <Grid item><Paper boxshadow={1} border={5} elevation={3} sx={{height: 500 ,  width: 500 }}> {}</Paper>  </Grid>
                
                <Grid item><Paper boxshadow={1} border={5} elevation={3} sx={{height: 500 ,  width: 500 }}> {}</Paper>  </Grid>
            
            </Grid>
        </Box>
      );
}

export default Maingrid