var rutas = require("express").Router();
var {mostrarVentas,nuevaVenta,cambiarEstatus,buscarPorIdV, editarVenta}= require("../bd/ventasBD");

//VENTAS
rutas.get("/ventas", async (req, res) => {
   try {
      var ventasValidas = await mostrarVentas();
      res.json(ventasValidas);
   } catch (error) {
      console.error("Error algo fallo al obtener las ventas:", error);
      res.status(500).json({ mensaje: "Ocurrió un error al obtener las ventas :(" });
   }
});

rutas.get("/ventas/buscarPorId/:id", async(req, res) => {
   const ventaValido = await buscarPorIdV(req.params.id);
   res.json(ventaValido);
});

rutas.put("/ventas/cambiarEstatus/:id", async(req,res)=>{
   const idVenta = req.params.id;
   const estatusCambiado = await cambiarEstatus(idVenta, "Cancelada");

   if (estatusCambiado) {
       res.json({ mensaje: `Estado actualizado a "Cancelada" :D` });
   } else if (estatusCambiado === false) {
       res.status(404).json({ mensaje: "Venta no encontrada" });
   } else {
       res.status(500).json({ mensaje: "Ocurrió un error al cambiar el estado" });
   }
});

rutas.put("/ventas/editarVenta/:id", async (req, res) => {
   const { id } = req.params; // ID de la venta que se está editando
   console.log(req.params); // Muestra los parámetros en la consola

   const { cantidad, nombre, id_prod } = req.body; // Extrae cantidad, nombre e id_prod del cuerpo de la solicitud
   console.log("Datos recibidos:", { cantidad, nombre, id_prod }); // Agrega un log para verificar los datos recibidos

   const ventaEditado = await editarVenta(id, { cantidad, nombre, id_prod }); // Pasa el id_prod al editarVenta

   res.json({
       success: ventaEditado,
       message: ventaEditado ? "Venta actualizada correctamente" : "Error al actualizar la venta"
   });
});


rutas.post("/ventas/nuevaVenta",async (req, res)=>{
   var ventasValidos=await nuevaVenta(req.body);
   res.json(ventasValidos);
});



module.exports=rutas;