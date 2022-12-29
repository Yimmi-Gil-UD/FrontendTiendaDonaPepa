import { ClienteDTO } from "./cliente-dto";

export class Factura {
    cliente:ClienteDTO;

    constructor(cliente:ClienteDTO){
        this.cliente=cliente;
    }
}
