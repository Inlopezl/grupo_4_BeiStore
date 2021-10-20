import React  from "react";
import { Fragment, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function ProductsQ () {

    const [products, setProducts] = useState({})

    useEffect(() =>{

        fetch("http://localhost:8080/api/products")
            .then(response =>{
                    return response.json()                
            })
            .then( products =>{
                    setProducts(products) 
            })
            .catch((error) => console.error(error))

    }, [])

    return(
    <Fragment>
        <Paper elevation={3} boxshadow={1} border={5}>
            <Card>
            <CardHeader title="Productos"/>
                <CardActionArea>
                    <CardContent>                                      
                         <Box> <Typography variant="h3"> {products.count}  <ShoppingCartIcon className="icon"/></Typography></Box> 
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper>
    </Fragment>
    )

   };

export default ProductsQ;