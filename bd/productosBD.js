const productosBD = require("./conexion").productos;
const Producto = require("../clases/ProductoClase");
const { productos } = require("./conexion");
function validarDatos(producto) {
    var valido = false;
    if (producto.nombre != undefined && producto.cantidad != undefined && producto.precio != undefined) {
        valido = true;
    }0
    return valido;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    productosValidos = [];
    productos.forEach(producto => { 
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validarDatos(producto1.getProducto)) {
            productosValidos.push(producto1.getProducto);
        }
    });
    return productosValidos;
}

async function buscarPorIdP(id) {
    const producto=await productosBD.doc(id).get();
    const producto1=new Producto({id:producto.id,...producto.data()});// aqui se ocupa el id 
    var productoValido;
    if (validarDatos(producto1.getProducto)) {
        productoValido=producto1.getProducto;
    }
    return productoValido;
};

async function buscarPorNombre(nombre) {
    
    const productos = await productosBD.get();
    // Filtra productos que contienen el texto ingresado en cualquier parte del nombre (insensible a mayúsculas)
    const productosEncontrados = productos.docs
        .filter(doc => doc.data().nombre.toLowerCase().includes(nombre.toLowerCase()))
        .map(doc => ({ id: doc.id, ...doc.data() })); // Obtiene una lista de productos con coincidencias


    return productosEncontrados;
}


async function nuevoProducto(data) {
    const producto1=new Producto(data);
    var productoValido=false;
    if (validarDatos(producto1.getProducto)) {
        await productosBD.doc().set(producto1.getProducto);
        productoValido=true;
    }
   return productoValido;
};

async function borrarProducto(id) {
    var productoValido=await buscarPorIdP(id);
    var productoBorrado=false;
    if (productoValido) {
        await productosBD.doc(id).delete();
        productoBorrado=true;
    }
    return productoBorrado;
}
async function editProd(id, nuevosDatos) {
    var productoValido = await buscarPorIdP(id);
    var productoEditado = false;

    if (productoValido) {
        try {
            // Asegurar que los datos tienen el tipo correcto:
            
            // Verificar que el campo "cantidad" existe y es un número
            if (nuevosDatos.cantidad !== undefined) {
                nuevosDatos.cantidad = parseInt(nuevosDatos.cantidad); // Convertir "cantidad" a número entero
            }

            // Verificar que el campo "precio" existe y es un número (float)
            if (nuevosDatos.precio !== undefined) {
                nuevosDatos.precio = parseFloat(nuevosDatos.precio); // Convertir "precio" a número decimal
            }

            // Puedes hacer lo mismo con otros campos que necesiten un formato específico.
            if (nuevosDatos.nombre !== undefined) {
                nuevosDatos.nombre = nuevosDatos.nombre.trim(); // Eliminar espacios en blanco innecesarios en el nombre
            }

            // Finalmente, actualizar el documento en Firebase
            await productosBD.doc(id).update(nuevosDatos);
            productoEditado = true;
        } catch (error) {
            console.error("Error al editar el producto:", error);
        }
    }
    return productoEditado;
}

module.exports={
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorIdP,
    buscarPorNombre,
    editProd
}
