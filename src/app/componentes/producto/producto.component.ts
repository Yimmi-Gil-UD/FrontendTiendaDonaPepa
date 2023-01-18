import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { ProductoDTO } from 'src/app/models/producto-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductoService } from 'src/app/servicios/producto.service';





@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  nombre:string;
  precio:number;
  stock:number;
  categoria = new Categoria();
  //idCategoria2 = new Categoria();
  tipoCategoriaR:number;

  idProductoActualizar:number;


  producto:Producto;
  productoDTO:ProductoDTO;
  categoriaLista:Categoria[];
  productosLista:ProductoDTO[];
  
  filterNP = '';
  
  constructor(
    private productoService:ProductoService,
    private categoriaService:CategoriaService
    
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  displayStyle = "none";
  displayStyleActualizar = "none";

  openPopup() {
    this.displayStyle = "block";
  }

  openPopupEditar(producto:ProductoDTO) {
    this.displayStyleActualizar = "block";
    this.idProductoActualizar = producto.id;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.stock = producto.stock;
    this.tipoCategoriaR = producto.categoria.idCategoria;
  }

  closePopup() {
    this.displayStyle = "none";
  }

  closePopupActualizar() {
    this.displayStyleActualizar = "none";
  }

  crear(){
    this.categoria.idCategoria = Number(this.tipoCategoriaR);
    this.producto = new Producto(this.nombre, this.precio, this.stock,this.categoria);
    //console.log(this.producto);
    this.productoService.crear(this.producto).subscribe(
      data =>{
        alert('producto creado');
        this.closePopup();
        this.borrarDatos();
        window.location.reload();
      },
      err =>{
        alert('Error al crear el producto');
        this.borrarDatos();
      }
    )
  }

  borrarDatos(){
    this.nombre = null;
    this.precio = null;
    this.stock = null;
    this.tipoCategoriaR= null;
  }

  Actualizar(){
    this.categoria.idCategoria = Number(this.tipoCategoriaR);
    this.producto = new Producto(this.nombre, this.precio, this.stock, this.categoria);
    //console.log(this.producto);
    //console.log("id del producto: ",this.idProductoActualizar);
    this.productoService.actualizar(this.idProductoActualizar,this.producto).subscribe(
      data => {
        alert('Producto actualizado');
        this.closePopupActualizar();
        window.location.reload();
      },
      err => {
        alert('Error al actualizar el producto');
      }
    );
    
  }

  listar(){
    this.categoriaService.listar().subscribe(
      data => {
        this.categoriaLista = data;
      },
      err => {
        console.log(err);
      }
    );

    this.productoService.listar().subscribe(
      data => {
        this.productosLista = data;
      },
      err =>{
        console.log(err);
      }
    );
  }

  borrarCliente(id:number){
    //console.log(id);
    this.productoService.eliminar(id).subscribe(
      data =>{
       alert('Producto eliminado');
       window.location.reload();
      },
      err =>{
        alert('Error al eliminar el cliente');
      }
    );
  }
  

  // Paginacion 

  

}
