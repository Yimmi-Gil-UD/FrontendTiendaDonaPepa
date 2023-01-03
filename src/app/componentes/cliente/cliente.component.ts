import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/models/ciudad';
import { Cliente } from 'src/app/models/cliente';
import { ClienteDTO } from 'src/app/models/cliente-dto';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { DetalleDto } from '../../models/detalle-dto';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  nombre:string;
  apellido:string;
  telefono:string;
  email:string;
  ciudadSeleccionada:number;
  documento:number;

  idClienteActualizar:number;

  ciudadLista:Ciudad[];
  clienteLista:ClienteDTO[];
  

  ciudad = new Ciudad();
  cliente:Cliente;

  constructor(
    private ciudadService:CiudadService,
    private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.listar();
  }

  displayStyle = "none";
  displayStyleUpdate = "none";

  listar(){
    this.ciudadService.listar().subscribe(
      data =>{
        this.ciudadLista = data;
      },
      err => {
        console.log(err);
      }
    );

    this.clienteService.listar().subscribe(
      data =>{
        this.clienteLista = data;
      },
      err =>{
        console.log(err);
      }
    )
  }

  crear(){
    this.ciudad.idCiudad = this.ciudadSeleccionada;
    this.cliente = new Cliente(this.nombre, this.apellido, this.telefono, this.email, this.documento, this.ciudad);
    console.log(this.cliente);
    this.clienteService.crear(this.cliente).subscribe(
      data =>{
        alert('cliente creado');
        this.closePopup();
        this.borrarDatos();
        window.location.reload();
      },
      err => {
        alert('Error al crear al cliente');
        this.borrarDatos();
      }
    )
  }

  borrarDatos(){
    this.nombre = null;
    this.apellido = null;
    this.telefono = null;
    this.email = null;
    this.ciudadSeleccionada = null;
  }

  actualizar(){
    this.ciudad.idCiudad = this.ciudadSeleccionada;
    this.cliente = new Cliente(this.nombre, this.apellido, this.telefono, this.email, this.documento, this.ciudad);
    console.log(this.cliente);
    this.clienteService.actualizar(this.idClienteActualizar, this.cliente).subscribe(
      data =>{
        alert('cliente actualizado');
        this.closePopupUpdate();
        window.location.reload();
      },
      err =>{
        alert('Error al actualizar el cliente');
      }
    )
  }

  eliminar(id:number){
    this.clienteService.eliminar(id).subscribe(
      data=>{
        alert('cliente eliminado');
        window.location.reload();
      },
      err =>{
        alert('error al eliminar el cliente');
      }
    )
  }

  closePopup(){
    this.displayStyle = "none";
  }

  closePopupUpdate(){
    this.displayStyleUpdate = "none";
  }

  openPopup(){
    this.displayStyle = "block";
  }

  openPopupUpdate(cliente:ClienteDTO){
    this.displayStyleUpdate = "block";
    this.nombre = cliente.nombre;
    this.apellido = cliente.apellido;
    this.telefono = cliente.telefono;
    this.email = cliente.email;
    this.ciudadSeleccionada = cliente.ciudad.idCiudad;
    this.idClienteActualizar = cliente.id;
  }

}
