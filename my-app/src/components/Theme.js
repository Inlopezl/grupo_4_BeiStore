import {Fragment} from "react"
import { createMuiTheme, ThemeProvider} from "@mui/material/styles"

const theme  = createMuiTheme({
    palette:{
        primary:{
            main: "#3805F2"
        }
    } 
})

function Theme() {
    return (
        {theme}
    );
}

export default Theme;