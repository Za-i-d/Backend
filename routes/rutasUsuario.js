var rutas = require("express").Router();
var {mostrarUsuarios,nuevoUsu,borrarUsuario,buscarPorId,editUsu,buscarPorNombre,login,getSessionUsuario,getSessionAdmin}= require("../bd/usuariosBD");

//USUARIOS
rutas.get("/usuarios",async(req, res)=>{
   // res.send("Hola estas en raíz");
   var usuariosValidos=await mostrarUsuarios();
   //console.log(usuariosVal);
   res.json(usuariosValidos); // json es un formato de comunicacion entre programas
});

rutas.get("/usuarios/buscarPorId/:id", async(req,res)=>{
   var usuariosValido =await buscarPorId(req.params.id);
   res.json(usuariosValido);
});

rutas.get("/usuarios/buscarPorNombre/:nombre", async (req, res) => {
   const { nombre } = req.params;
   const usuarios = await buscarPorNombre(nombre);
   if (usuarios.length > 0) {
       res.json(usuarios); // Devuelve una lista de usuarios
   } else {
       res.status(404).json({ mensaje: "No se encontraron usuarios con ese nombre" });
   }
});


rutas.delete("/usuarios/borrarUsuario/:id", async(req,res)=>{
   var usuarioBorrado=await borrarUsuario (req.params.id);
   res.json(usuarioBorrado);
});

rutas.post("/usuarios/nuevoUsuario",async (req, res)=>{
   var usuarioValido=await nuevoUsu(req.body);
   res.json(usuarioValido);
});

// Nueva ruta para editar usuario
rutas.put("/usuarios/editarUsuario/:id", async (req, res) => {
   const id = req.params.id;
   const nuevosDatos = req.body;
   var usuarioEditado = await editUsu(id, nuevosDatos);
   res.json({
       success: usuarioEditado,
       message: usuarioEditado ? "Usuario actualizado correctamente" : "Error al actualizar el usuario"
   });
});

rutas.post("/login", async(req,res)=>{
   const usuarioCorrecto = await login(req, req.body.usuario, req.body.password);
   console.log("Esto es de login");
   console.log(usuarioCorrecto);
   res.json(usuarioCorrecto);
 });

rutas.get("/getSessionUsuario", (req, res)=>{
   var sessionValida = getSessionUsuario(req);
   console.log("Esto es getSessionUsuario");
   console.log(sessionValida);
   res.json(sessionValida);
})

rutas.get("/getSessionAdmin", (req, res)=>{
   res.json(getSessionAdmin(req));
})

module.exports=rutas;