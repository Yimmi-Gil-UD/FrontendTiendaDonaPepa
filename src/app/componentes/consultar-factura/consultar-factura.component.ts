import { Component, OnInit } from '@angular/core';
import { InformacionFacturaDTO } from 'src/app/models/informacion-factura-dto';
import { FacturaService } from 'src/app/servicios/factura.service';

@Component({
  selector: 'app-consultar-factura',
  templateUrl: './consultar-factura.component.html',
  styleUrls: ['./consultar-factura.component.css']
})
export class ConsultarFacturaComponent implements OnInit {

  idConsultarFactura:number;
  listaDatosFactura:InformacionFacturaDTO[];

  //Datos Cliente
  nombreCliente='';
  documentoCliente=0;
  correoCliente='';
  ciudadCliente='';
  telefonoCliente=0;
  idFactura=0;
  valorTotal = 0;

  constructor(private facturaService:FacturaService) { }

  ngOnInit(): void {
  }

  consultarFactura(){
    this.valorTotal = 0;
    this.facturaService.listarFacturaPorId(this.idConsultarFactura).subscribe(
      data =>{
        if(data.length < 1){
          alert('No existe la factura');
        this.listaDatosFactura = null;
        this.nombreCliente = '';
        this.documentoCliente = 0;
        this.correoCliente = '';
        this.ciudadCliente = '';
        this.telefonoCliente = 0;
        this.idFactura = 0;
        this.idConsultarFactura = null;
        this.valorTotal = 0;
        }else{
        //console.log(data);
        this.listaDatosFactura = data;
        this.nombreCliente = data[0].nombreApellidoCliente;
        this.documentoCliente = data[0].documentoCliente;
        this.correoCliente = data[0].emailCliente;
        this.ciudadCliente = data[0].ciudadCliente;
        this.telefonoCliente = data[0].telefonoCliente;
        this.idFactura = data[0].idFactura;

        for(let i = 0;i<data.length;i++){
          this.valorTotal += data[i].precioProducto;
        }

        }
      },err =>{
        //console.log(err);
        alert('No existe la factura');
      }
    )
  }


  
}
