import { FacturaDto } from "./factura-dto";
import { ProductoDTO } from "./producto-dto";

export class DetalleDto {

    id:number;
    cantidad:number;
    precio:number;
    producto:ProductoDTO;
    factura:FacturaDto;
}
