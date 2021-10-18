import React from 'react'
import ProductsQ from "./ProductsQ" //Registro de la Cantidad de Productos
import ProductsCatQ from "./ProductsCatQ" // Registro de la Cantidad de Categorias
import UsersQ from "./UsersQ" // Registro de la Cantidad de Usuarios
import LastProduct from "./LastProduct" // Registro del ultimo Producto
import LastUser from "./LastUser" // Registro del ultimo Usuario

function Main() {
    return (

        <main>
            
            <ProductsQ/>                  
    
            <ProductsCatQ/>

            <UsersQ/>

            <LastProduct/>
            
            <LastUser/>
            
        </main>
        
      );
}

export default Main
