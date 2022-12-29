import { ClienteDTO } from "./cliente-dto";

export class FacturaDto {
    id:number;
    fechaCreacion:Date;
    cliente:ClienteDTO;

    /*constructor(id:number, fechaCreacion:Date, cliente:ClienteDTO){
        this.id = id;
        this.fechaCreacion = fechaCreacion;
        this.cliente = cliente;
    }*/
}
