var rutas = require("express").Router();
var {mostrarProductos,nuevoProducto,borrarProducto,buscarPorIdP,editProd, buscarPorNombre}= require("../bd/productosBD");

//PRODUCTO
rutas.get("/productos",async(req, res)=>{
   var productosValidos=await mostrarProductos();
   res.json(productosValidos);
});

rutas.get("/productos/buscarPorId/:id", async(req,res)=>{
   var productosValido =await buscarPorIdP(req.params.id);
   res.json(productosValido);
});

rutas.get("/productos/buscarPorNombre/:nombre", async (req, res) => {
   const { nombre } = req.params;
   
   try {
       const productos = await buscarPorNombre(nombre);
     
       if (productos && productos.length > 0) {
           res.json(productos);
       } else {
           console.log("Mensaje en error 404: ", productos);
           res.status(404).json({ mensaje: "No se encontraron productos" });
       }
   } catch (error) {
       console.error("Error al buscar productos:", error);
       res.status(500).json({ mensaje: "Error en el servidor" });
   }
});


rutas.delete("/productos/borrarProducto/:id", async(req,res)=>{
   var productoBorrado=await borrarProducto (req.params.id);
   res.json(productoBorrado);
});

rutas.post("/productos/nuevoProducto",async (req, res)=>{
   var productoValido=await nuevoProducto(req.body);
   res.json(productoValido);
});

rutas.put("/productos/editarProducto/:id", async (req, res) => {
   const id = req.params.id;
   const nuevosDatos = req.body;
   
   // Verifica qué datos estás enviando
   console.log("Datos recibidos para actualizar:", nuevosDatos);
   
   var productoEditado = await editProd(id, nuevosDatos);
   res.json({
       success: productoEditado,
       message: productoEditado ? "Producto actualizado correctamente" : "Error al actualizar el producto"
   });
});




module.exports=rutas;