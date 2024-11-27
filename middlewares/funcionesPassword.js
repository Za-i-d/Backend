const { log } = require("console");
var crypto = require("crypto");
function encriptarPass(password) {
    var salt=crypto.randomBytes(32).toString("hex"); //generamos un conjunto de caracteres que va ser el salth 
    //console.log(salt);
    const hash = crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    //console.log(hash);
    return{
        salt,
        hash
    }
    
};

function validarPassword(password, salt, hash){
    const hashValidar = crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    return hashValidar == hash;
};

function usuarioAutorizado(req, res, cb){
    var autorizado = false;
    if (req.session.usuario){
        console.log("Usuario autorizado");
        autorizado = true;
    }
    return autorizado;
};

function adminAutorizado(){
    var autorizado= false;
    if (req.session.admin){
        console.log("Admin autorizado");
        autorizado = true;
    }
    return autorizado;
};

module.exports={
    encriptarPass,
    validarPassword,
    usuarioAutorizado,
    adminAutorizado
}