require("dotenv").config();
const express = require("express");
const cors= require("cors");
const session = require("express-session");
const usuariosRutas= require("./routes/rutasUsuario");
const productosRutas= require("./routes/rutasProducto");
const ventasRutas= require("./routes/rutasVentas");


const app= express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(session({
    name : 'session',
    secret : process.env.KEYS,
    resave : false,
    saveUninitialized: true,
    maxAge : 1000*60*60*24
}));
app.use("/", usuariosRutas);// el  json va antes de las rutas 
app.use("/", productosRutas);
app.use("/", ventasRutas);

const port= process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});