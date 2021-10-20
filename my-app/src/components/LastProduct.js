import React  from "react";
import { Fragment, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';  
import Avatar from '@mui/material/Avatar';

function LastProduct () {

    const [products, setProducts] = useState({})

    useEffect(() =>{

        fetch("http://localhost:8080/api/products")
            .then(response =>{
                    return response.json()                
            })
            .then( products =>{
                    setProducts(products.lastProduct) 
            })
            .catch((error) => console.error(error))

    }, [])


    return(
    <Fragment>
        <Paper elevation={3} boxshadow={1} border={5} >
            <Card>
                <Typography variant="h6" sx={{textAlign: 'center'}}> Ultimo producto  </Typography>
                <CardActionArea>
                <CardHeader 
                    avatar={
                    <Avatar src={products.image}  aria-label="recipe"/>
                    }
                    title={products.name}
                    subheader={products.brand}
                />
                    <CardContent>
                        
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>
    </Fragment>
    )

   };

export default LastProduct;