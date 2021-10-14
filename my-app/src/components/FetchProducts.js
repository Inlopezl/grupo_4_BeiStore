import React  from "react";
import { Fragment, useState, useEffect } from "react";

function FetchProducts () {

    const [products, setProducts] = useState({})

    useEffect(() =>{

        fetch("http://localhost:8080/api/products")
            .then(response =>{
                    return response.json()                
            })
            .then( products =>{
                    setProducts(products) 
                    console.log(products);
            })
            .catch((error) => console.error(error))

    }, [])

    return(<div>{products.count}</div>)
    
   };

export default FetchProducts;