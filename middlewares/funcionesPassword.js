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

function validarPassword(password, hash, salt){
    const hashValidar = crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    return hashValidar==hash;
};

function usuarioAutorizado(){
    var autorizado = false;

    return autorizado;
};

function adminAutorizado(){
    var autorizado= false;

    return autorizado;
};

module.exports={
    encriptarPass,
    validarPassword,
    usuarioAutorizado,
    adminAutorizado
}

//encriptarPass("holaa");
