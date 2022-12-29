import { Categoria } from './categoria';

export class Producto {

    nombre:string;
    precio:number;
    stock:number;
    categoria:Categoria;

    constructor(nombre:string, precio:number, stock:number ,categoria:Categoria){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }

}
