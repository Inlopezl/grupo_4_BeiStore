import React from 'react'
import ProductsQ from "./ProductsQ" //Registro de la Cantidad de Productos
import ProductsCatQ from "./ProductsCatQ" // Registro de la Cantidad de Categorias
import PieProductsCatQ from "./PieProductsCatQ" // Grafico de la Cantidad de Categorias
import UsersQ from "./UsersQ" // Registro de la Cantidad de Usuarios
import LastProduct from "./LastProduct" // Registro del ultimo Producto
import LastUser from "./LastUser" // Registro del ultimo Usuario
import DataGrid from "./DataGrid" // Tabla de datos

function Main() {
    return (

        <main>
            
            <ProductsQ/>                  
    
            <ProductsCatQ/>

            <PieProductsCatQ/>

            <UsersQ/>

            <LastProduct/>
            
            <LastUser/>
            
            <DataGrid/>

        </main>
        
      );
}

export default Main
