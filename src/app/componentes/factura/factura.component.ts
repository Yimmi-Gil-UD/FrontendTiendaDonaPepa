import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from 'src/app/models/cliente-dto';
import { Detalle } from 'src/app/models/detalle';
import { FacturaDto } from 'src/app/models/factura-dto';
import { Producto } from 'src/app/models/producto';
import { DetalleService } from 'src/app/servicios/detalle.service';
import { FacturaService } from 'src/app/servicios/factura.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Factura } from '../../models/factura';
import { ProductoDTO } from '../../models/producto-dto';
import { ClienteService } from '../../servicios/cliente.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  idProductoSeleccionado:number;
  listaProductos:ProductoDTO[];

  
  numDocumentoBuscar:number;
  idClienteBuscado:number;
  
  //datos de la factura
  nombreC:string;
  fecha:Date;
  numFactura:number;

  //
  //facturaObj = new FacturaDto();
  cliente = new ClienteDTO();
  factura:Factura;
  detalle:Detalle;
  facturaDto = new FacturaDto();
  productoDto: ProductoDTO;
  producto:Producto;
  idFacturaCreada:number;
  fechaFactura:Date;
  cantidad=1;
  precioProducto=0;
  precioProductoFinal=0;

  subTotal=0;
  iva=0.16;
  ivaValor=0;
  total=0;

  banderaCrearFactura:boolean;
  banderaBuscarCliente:boolean;
  
  listaDetalles:Detalle[]=[];


  constructor(
    private productoService:ProductoService,
    private clienteService:ClienteService,
    private facturaService:FacturaService,
    private detalleService:DetalleService
    ) { }

  ngOnInit(): void {
    this.listar();
    this.cargarDivInicio();
  }

  
  cargarDivInicio(){
    //block
    document.getElementById("apartado2").style.display = "none";
    document.getElementById("apartado3").style.display = "none";
    document.getElementById("apartado4").style.display = "none";
    document.getElementById("apartado5").style.display = "none";
  }


  listar(){
    this.productoService.listar().subscribe(
      data => {
        this.listaProductos = data;
      }
    )
  }


  aumentar(){
    this.cantidad +=1;
  }

  disminuir(){
    if(this.cantidad<=1){
      alert('no se aceptan valores menores a 1');
    }else{
      this.cantidad -=1;
    }
    
  }

  buscarCliente(){
      this.clienteService.buscarPorDocumento(this.numDocumentoBuscar).subscribe(
       data =>{
        if(data === null)
        {
          alert('No existe el cliente');
          this.numDocumentoBuscar = null;
          document.getElementById("apartado2").style.display = "none";
        }else{
        alert('Existe el cliente');
        this.nombreC = data.nombre +' '+ data.apellido;
        this.idClienteBuscado = data.id;
        this.numDocumentoBuscar = null;
        document.getElementById("apartado2").style.display = "block";
        this.banderaBuscarCliente = false;
        }
       },
       err =>{
        console.log(err);
        this.numDocumentoBuscar = null;
       }
      )
  }

  crearFactura(){
    this.cliente.id = this.idClienteBuscado;
    this.factura = new Factura(this.cliente);

    if(this.idClienteBuscado > 0){
      this.facturaService.crear(this.factura).subscribe(
        data => {
          alert('Factura Creada');
          this.idFacturaCreada = data.id;
          this.fechaFactura = data.fechaCreacion;
          this.restablecerValores();
          document.getElementById("apartado3").style.display = "block";
          document.getElementById("apartado4").style.display = "block";
          document.getElementById("apartado5").style.display = "block";
          this.banderaCrearFactura = false;
        },
        err => {
          alert('Error al crear la factura');
          console.log(err);
          this.restablecerValores();
          document.getElementById("apartado3").style.display = "none";
          document.getElementById("apartado4").style.display = "none";
          document.getElementById("apartado5").style.display = "none";
        }
      )
    }else{
      alert('Debe buscar un cliente existente primero');
    }
    
  }

  restablecerValores(){
    this.idClienteBuscado = null;
  }


  agregarADetalle(){
      this.productoService.buscarPorId(this.idProductoSeleccionado).subscribe(
        data =>{
        if(this.cantidad > data.stock){
            alert('La cantidad es mayor al stock del producto');
        }else{
          this.precioProducto = data.precio;

          this.precioProductoFinal = this.precioProducto * this.cantidad;
          this.subTotal += this.precioProductoFinal;
          this.ivaValor = this.subTotal*0.16;
          this.total = (this.subTotal+this.ivaValor);
  
  
          this.facturaDto.id = this.idFacturaCreada;
  
          this.productoDto = new ProductoDTO(this.idProductoSeleccionado,data.nombre,data.precio,data.stock,data.fechaCreacion,data.categoria);
  
          this.detalle = new Detalle(this.cantidad, this.precioProductoFinal, this.productoDto, this.facturaDto);
            

          this.detalleService.crear(this.detalle).subscribe(
            data => {
              alert('Producto Agregado');
              this.listaDetalles.push(this.detalle);
           
              this.idProductoSeleccionado = null;
              this.cantidad = null;
              this.idProductoSeleccionado = null;
            },
            err => {
              alert('Error al agregar el producto');
            })

            this.producto = new Producto(data.nombre, data.precio, (data.stock-this.cantidad),data.categoria);
            this.productoService.actualizar(data.id, this.producto).subscribe(
              data =>{
                console.log("Producto actualizado: ");
              },
              err =>{
                console.log("Error al actualizar el producto: ",err);
              }
            )
        }
      

      
        

        });    

  }

  terminarCompra(){
    this.listaDetalles.length = 0;
    this.idProductoSeleccionado = null;
    this.nombreC = null;
    this.fecha = null;
    this.numFactura = null;
    this.idFacturaCreada = null;
    this.fechaFactura = null;
    this.precioProducto = null;
    this.precioProductoFinal = null;
    this.subTotal = null;
    this.ivaValor = null;
    this.total = null;
    //this.banderaBuscarCliente = true;
    //this.banderaCrearFactura = true;
    window.location.reload();
    document.getElementById("apartado2").style.display = "none";
    document.getElementById("apartado3").style.display = "none";
    document.getElementById("apartado4").style.display = "none";
    document.getElementById("apartado5").style.display = "none";
    alert('Compra Terminada');

  }


}
