import React from 'react'
import { Fragment } from "react";

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
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Theme from './Theme.js'
import '../css/main.css';


let components = [<ProductsQ/>,<ProductsCatQ/>,<UsersQ/>,<LastProduct/>,<LastUser/>,<PieProductsCatQ/>]

function Main() {
    return (
    <Fragment>



        <main>

            <Divider className="divider">  </Divider>

            <Masonry columns={3} spacing={2}>
                {components.map((item, index) => (
                    <MasonryItem key={index}>
                        {item}
                    </MasonryItem>
                ))}
            </Masonry>  

            <Divider className="divider">  </Divider>

        </main>
        
        

        <section class="dataGrid">
            <DataGrid/>
        </section>

        

    </Fragment>   
      );
}

export default Main
