import React  from "react";
import { Fragment, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

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
            <Card >
                <CardActionArea>
                    <CardContent>
                           Ultimo producto creado: {products.name}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>
    </Fragment>
    )

   };

export default LastProduct;