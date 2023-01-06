import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/servicios/factura.service';

@Component({
  selector: 'app-consultar-factura',
  templateUrl: './consultar-factura.component.html',
  styleUrls: ['./consultar-factura.component.css']
})
export class ConsultarFacturaComponent implements OnInit {

  idConsultarFactura:number;

  constructor(private facturaService:FacturaService) { }

  ngOnInit(): void {
  }

  consultarFactura(){
    this.facturaService.listarFacturaPorId(this.idConsultarFactura).subscribe(
      data =>{
        console.log(data);
      },err =>{
        console.log(err);
      }
    )
  }

}
