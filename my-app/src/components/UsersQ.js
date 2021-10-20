import React  from "react";
import { Fragment, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';


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
                <Card>
                    <CardHeader title="Usuarios"/>
                    <CardActionArea>
                        <CardContent>                
                           <Typography variant="h3"> <Box>{users.count} <PersonIcon className="icon"/></Box></Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Paper>
        </Fragment>
        )
    

   };

export default UsersQ;