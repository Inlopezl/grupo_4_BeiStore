import React from 'react'
import ProductsQ from "./ProductsQ" //Registro de la Cantidad de Productos
import ProductsCatQ from "./ProductsCatQ" // Registro de la Cantidad de Categorias
import PieProductsCatQ from "./PieProductsCatQ" // Grafico de la Cantidad de Categorias
import UsersQ from "./UsersQ" // Registro de la Cantidad de Usuarios
import LastProduct from "./LastProduct" // Registro del ultimo Producto
import LastUser from "./LastUser" // Registro del ultimo Usuario
import DataGrid from "./DataGrid" // Tabla de datos
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';
import Divider from '@mui/material/Divider';


let components = [<ProductsQ/>,<ProductsCatQ/>,<PieProductsCatQ/>,<UsersQ/>,<LastProduct/>,<LastUser/>,<DataGrid/>]

function Main() {
    return (

        <main>
  
            
            <Masonry columns={2} spacing={3}>
                {components.map((item, index) => (
                    <MasonryItem key={index}>
                        {item}
                    </MasonryItem>
                ))}
            </Masonry>  
          
      
                    
               
        </main>
        
      );
}

export default Main
