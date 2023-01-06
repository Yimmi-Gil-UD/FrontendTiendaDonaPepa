export class InformacionFacturaDTO {
    
    idFactura:number;
	fechaCreacionFactura:Date;
	cantidadProductos:number;
	precioProducto:number;
	nombreProducto:string;
	nombreCategoria:string;
	nombreApellidoCliente:string;
	emailCliente:string;
	telefonoCliente:number;
	documentoCliente:number;
	ciudadCliente:string;

    constructor(idFactura:number, fechaCreacionFactura:Date,cantidadProductos:number,precioProducto:number,
        nombreProducto:string,nombreCategoria:string,nombreApellidoCliente:string,emailCliente:string,
        telefonoCliente:number,documentoCliente:number,ciudadCliente:string){

            this.idFactura = idFactura;
            this.fechaCreacionFactura = fechaCreacionFactura;
            this.cantidadProductos = cantidadProductos;
            this.precioProducto = precioProducto;
            this.nombreProducto = nombreProducto;
            this.nombreCategoria = nombreCategoria;
            this.nombreApellidoCliente = nombreApellidoCliente;
            this.emailCliente = emailCliente;
            this.telefonoCliente = telefonoCliente;
            this.documentoCliente = documentoCliente;
            this.ciudadCliente = ciudadCliente;
    }


}
