import React  from "react";
import { Fragment, useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { Chart } from "react-google-charts";


function PieProductsCatQ () {

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
    let result = []
    result.push(['Categoria', 'Productos'])
    let dato = categories.map((category) => result.push([category.name , category.countCat]));
    return(
    <Fragment>
        <Paper elevation={3} boxshadow={1} border={5}  >

            <Card>  
                <CardActionArea>
                    <CardContent>   
                    <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={result}
                            options={{
                                title: 'Categorias',
                                is3D: true,
                            }}
                            rootProps={{ 'data-testid': '2' }}
                            />          
                    </CardContent>
                </CardActionArea>
            </Card>
            </Paper>    
    </Fragment>
            )} 
           

        

export default PieProductsCatQ;