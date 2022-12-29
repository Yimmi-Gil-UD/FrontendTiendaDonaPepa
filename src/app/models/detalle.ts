import { FacturaDto } from "./factura-dto";
import { ProductoDTO } from "./producto-dto";

export class Detalle {

    cantidad:number;
    precio:number;
    producto:ProductoDTO;
    factura:FacturaDto;

    constructor(cantidad:number, precio:number, producto:ProductoDTO, factura:FacturaDto){
        this.cantidad = cantidad;
        this.precio = precio;
        this.producto = producto;
        this.factura = factura;
    }
}
