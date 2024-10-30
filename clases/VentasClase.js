class Venta {
    constructor(data) {
        // console.log(data);
        this.id = data.id;
        this.id_usu = data.id_usu;
        this.id_prod = data.id_prod;
        this.cantidad = data.cantidad;
        this.estado = data.estado;
        this.fecha = data.fecha;
        this.hora = data.hora;
    }
    set id(id) {
        this._id = id;
    }
    set id_usu(id_usu) {
        //console.log(idusu);
        this._id_usu=id_usu;
    }
    set id_prod(id_prod) {        
        //console.log(idprod);
        this._id_prod = id_prod;   
    }
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }
    set estado(estado) {
        this._estado = estado;
    }
    set fecha(fecha) {
        this._fecha = fecha;
    }
    set hora(hora) {
        this._hora = hora;
    }
   

    get id() {
        return this._id;
    }
    get id_usu() {
        //console.log(this._idusu);
        return this._id_usu;
    }
    get id_prod() {
        //console.log(this._idprod);
        return this._id_prod;
    }
    get cantidad() {
        return this._cantidad;
    }
    get estado() {
        return this._estado;
    }
    get fecha() {
        return this._fecha;
    }
    get hora() {
        return this._hora;
    }
    
    get getVenta() {
        const conid={
            id: this._id,
            id_usu: this.id_usu,
            id_prod: this.id_prod,
            cantidad: this.cantidad,
            estado: this.estado,
            fecha: this.fecha,
            hora: this.hora
        }
        const sinid={
            id_usu: this.id_usu,
            id_prod: this.id_prod,
            cantidad: this.cantidad,
            estado:this.estado,
            fecha: this.fecha,
            hora: this.hora
        }
        if (this.id==undefined) {
            return sinid;
        }
        else{
            return conid;
        }
    }
}
module.exports = Venta;

//tarea son las validaciones para los set aqui mismo 