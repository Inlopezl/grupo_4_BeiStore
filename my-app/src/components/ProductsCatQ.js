import React  from "react";
import { Fragment, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import '../css/main.css';


function ProductsCatQ () {

    const [products, setProducts] = useState({})
    const [categories, setCategories] = useState([])

    useEffect(() =>{

        fetch("http://localhost:8080/api/products")
            .then(response =>{
                    return response.json()                
            })
            .then( products =>{
                    setProducts(products) 
                    setCategories(products.countByCategory)
            })
            .catch((error) => console.error(error))

    }, [])


    return(
    <Fragment>
        <Paper elevation={3} boxshadow={1} border={5}>

            <Card className="card">
                <CardActionArea>
                    <CardContent>       
                       <Typography sx={{textAlign: 'center'}}> Categorias <Box> {categories.length} </Box> </Typography>  
                    </CardContent>
                </CardActionArea>
            </Card>

            <Divider variant="inset"/>

           {categories.map(element => (  
           
           <Card className="card">
                <CardActionArea>
                    <CardContent>   
                        <Typography>   {element.name}: {element.countCat} </Typography>       
                    </CardContent>
                </CardActionArea>
            </Card>
            ))} 
           

        </Paper>    
    </Fragment>
    )

   };

export default ProductsCatQ;