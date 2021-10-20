import React  from "react";
import { Fragment, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function LastUser () {

    const [users, setUsers] = useState({})

    useEffect(() =>{

        fetch("http://localhost:8080/api/users")
            .then(response =>{
                    return response.json()                
            })
            .then(users =>{
                    setUsers(users.lastUser) 
            })
            .catch((error) => console.error(error))

    }, [])

    return(
    <Fragment>
        <Paper elevation={3} boxshadow={1} border={5} >
            <Card>
            <Typography variant="h6" sx={{textAlign: 'center'}}>Ultimo usuario</Typography>
                <CardActionArea>    
                <CardHeader
                    avatar={
                    <Avatar src={users.avatar} aria-label="recipe"/>
                    }
                    title={users.firstName}
                    subheader={users.email}
                />
                    <CardContent>
                        <Typography variant="h6" sx={{textAlign: 'center'}}> </Typography>
                    </CardContent>  
                </CardActionArea>
            </Card>
        </Paper>
    </Fragment>
    )

   };

export default LastUser;