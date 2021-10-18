import React  from "react";
import { Fragment, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

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
                <CardActionArea>
                    <CardContent>
                           Ultimo usuario creado: {users.firstName}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>
    </Fragment>
    )

   };

export default LastUser;