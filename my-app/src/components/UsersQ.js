import React  from "react";
import { Fragment, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function UsersQ () {

    const [users, setUsers] = useState({})

    useEffect(() =>{

        fetch("http://localhost:8080/api/users")
            .then(response =>{
                    return response.json()                
            })
            .then(users =>{
                    setUsers(users) 
            })
            .catch((error) => console.error(error))

    }, [])


    return(
        <Fragment>
            <Paper elevation={3} boxshadow={1} border={5} >
                <Card >
                    <CardActionArea>
                        <CardContent>                
                           <Typography variant="h6" sx={{textAlign: 'center'}}>Usuarios<Box>{users.count}</Box></Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Paper>
        </Fragment>
        )
    

   };

export default UsersQ;