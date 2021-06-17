const express = require('express');
const app = express();
const path = require('path');
const web = require('./routers/web');
// server
app.listen(3000,()=>console.log("Server on http://localhost:3000"));

//carpeta publica
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(web);