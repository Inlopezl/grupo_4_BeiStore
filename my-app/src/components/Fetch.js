import React  from "react";
import { Fragment, useState, useEffect } from "react";

function Fetch () {

    const [products, setProducts] = useState({})

    useEffect(() =>{

        fetch("http://localhost:3001/api/products")
            .then(response =>{
                    return response.json()                
            })
            .then( products =>{
                setProducts(products)
            })
            .catch((error) => console.error(error))

    }, [])

    return(<div></div>)
    
   };

export default Fetch;