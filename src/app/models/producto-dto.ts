import { Categoria } from "./categoria";

export class ProductoDTO {

    id:number;
    nombre:string;
    precio:number;
    stock:number;
    fechaCreacion:Date;
    categoria:Categoria;

    constructor(id:number, nombre:string, precio:number, stock:number, fechaCreacion:Date, categoria:Categoria){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.fechaCreacion = fechaCreacion;
        this.categoria = categoria;
    }
}


