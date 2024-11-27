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
    // console.log(usuariosValidos);
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

    // Filtrar usuarios cuyo nombre contiene la cadena proporcionada (búsqueda parcial)
    const usuariosEncontrados = usuarios.docs
        .filter(doc => doc.data().nombre.toLowerCase().includes(nombre.toLowerCase()))
        .map(doc => ({ id: doc.id, ...doc.data() })); // Formato adecuado para cada usuario encontrado

    return usuariosEncontrados;
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

async function login(req, usuario, password) {
    //usuariosBD.doc es cuando queremos consultar por id
    var data = {};
    const usuarioEncontrado = await usuariosBD.where("usuario","==",usuario).get();
    var user = {
        usuario : "anonimo",
        tipo : "sin tipo de usuario"
    }
    if (usuarioEncontrado.size > 0) {
        usuarioEncontrado.forEach(usu => {
            const passwordValido = validarPassword(password, usu.data().salt, usu.data().password);
            if (passwordValido) {
                user.usuario = usu.data().usuario;
                if (usu.data().tipoUsuario == "usuario") {
                    req.session.usuario = user.usuario;
                    user.tipo = "usuario";
                    console.log("Inicio sesion un usuario");
                    
                } else if (usu.data().tipoUsuario == "admin") {
                    req.session.admin = user.usuario;
                    user.tipo = "admin";
                    console.log("Inicio sesion un administrador");
                    
                }
            }
        })
    }
    return user;
}

function getSessionUsuario(req) {
    var activo = false;
    if (req.session.usuario != undefined || req.session.admin != undefined) {
        activo = true;
    }
    return activo;
}

function getSessionAdmin(req) {
    var activo = false;
    if (req.session.admin != undefined) {
        activo = true;
    }
    return activo;
}


module.exports={
    mostrarUsuarios,
    nuevoUsu,
    borrarUsuario,
    buscarPorId,
    buscarPorNombre,
    editUsu,
    login,
    getSessionUsuario,
    getSessionAdmin
}
