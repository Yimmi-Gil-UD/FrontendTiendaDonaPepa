import { Ciudad } from 'src/app/models/ciudad';
export class Cliente {

    nombre:string;
    apellido:string;
    telefono:string;
    email:string;
    documento:number;
    ciudad:Ciudad;

    constructor(nombre:string, apellido:string, telefono:string, email:string, documento:number, ciudad:Ciudad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.documento = documento;
        this.ciudad = ciudad;
    }

}
