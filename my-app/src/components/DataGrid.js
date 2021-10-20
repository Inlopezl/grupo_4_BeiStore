import React  from "react";
import {useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function CustomToolbarGrid() {

    const [products, setProducts] = useState([])

    useEffect(() =>{

        fetch("http://localhost:8080/api/products")
            .then(response =>{
                    return response.json()                
            })
            .then( products =>{
                    setProducts(products.products) 
            })
            .catch((error) => console.error(error))

    }, [])

    console.log(products)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={[
            { field: 'id', width: 150, headerName: 'ID'},
            { field: 'name', width: 150 , headerName: 'NAME'},
            { field: 'price', width: 150 , headerName: 'PRICE'},
          ]}
          rows={products}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}