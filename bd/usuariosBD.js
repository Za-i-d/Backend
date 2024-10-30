const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../clases/UsuarioClase");
const { usuarios } = require("./conexion");
const{encriptarPass, validarPassword,usuarioAutorizado,adminAutorizado}=require("../middlewares/funcionesPassword")
function validarDatos(usuario) {
    var valido = false;
    if (usuario.nombre != undefined && usuario.usuario != undefined && usuario.password != undefined) {
        valido = true;
    }
    return valido;
}
//console.log(usuariosBD);

async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    //console.log(usuarios.id);
    usuariosValidos = [];
    usuarios.forEach(usuario => { //usuarios solo contiene un registro y el foreach me desglosa la informacion
        // -console.log(usuario.data());
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        if (validarDatos(usuario1.getUsuario)) {
            usuariosValidos.push(usuario1.getUsuario);
        }
    });
    //console.log(usuariosValidos);
    return usuariosValidos;
}
//mostrarUsuarios();

async function buscarPorId(id) {
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()});// aqui se ocupa el id 
    var usuarioValido;
    if (validarDatos(usuario1.getUsuario)) {
        usuarioValido=usuario1.getUsuario;
    }
    //console.log(usuarioValido);
    return usuarioValido;
};

async function buscarPorNombre(nombre) {
    const usuarios = await usuariosBD.get(); // Obtener todos los usuarios
    const usuarioEncontrado = usuarios.docs.find(doc => doc.data().nombre === nombre);
    return usuarioEncontrado ? { id: usuarioEncontrado.id, ...usuarioEncontrado.data() } : null;
}

async function editUsu(id, nuevosDatos) {
    var usuarioValido = await buscarPorId(id);
    var usuarioEditado = false;

    if (usuarioValido) {
        try {
            await usuariosBD.doc(id).update(nuevosDatos);
            usuarioEditado = true;
        } catch (error) {
            console.error("Error al editar el usuario:", error);
        }
    }
    return usuarioEditado;
}

async function nuevoUsu(data) {
    const {salt, hash}= encriptarPass(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);// aqui no 
    //console.log(usuario1.getUsuario);
    var usuarioValido=false;
    if (validarDatos(usuario1.getUsuario)) {
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido=true;
    }
   return usuarioValido;
};

async function borrarUsuario(id) {
    var usuarioValido=await buscarPorId(id);
    var usuarioBorrado=false;
    if (usuarioValido) {
        await usuariosBD.doc(id).delete();
        usuarioBorrado=true;
    }
    return usuarioBorrado;
}

module.exports={
    mostrarUsuarios,
    nuevoUsu,
    borrarUsuario,
    buscarPorId,
    buscarPorNombre,
    editUsu
}
