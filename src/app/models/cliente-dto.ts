import { Ciudad } from "./ciudad";

export class ClienteDTO {

    id:number;
    nombre:string;
    apellido:string;
    telefono:string;
    email:string;
    documento:number;
    ciudad:Ciudad;
}
