class Producto {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.cantidad = data.cantidad;
        this.precio = data.precio;
    }
    set id(id) {
        this._id = id;
    }
    set nombre(nombre) {
        this._nombre=nombre;
    }
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }
    set precio(precio) {
        this._precio = precio;   
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }
    get cantidad() {
        return this._cantidad;
    }
    get precio() {
        return this._precio;
    }
    get getProducto() {
        const conid={
            id: this._id,
            nombre: this.nombre,
            cantidad: this.cantidad,
            precio: this.precio
        }
        const sinid={
            nombre: this.nombre,
            cantidad: this.cantidad,
            precio: this.precio
        }
        if (this.id==undefined) {
            return sinid;
        }
        else{
            return conid;
        }
    }
}

module.exports = Producto;

//tarea son las validaciones para los set aqui mismo 