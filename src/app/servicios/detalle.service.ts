import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detalle } from '../models/detalle';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  //productoUrl = 'http://localhost:9898/api/productos/'

  constructor(
    private httpClient:HttpClient
  ) { }


  crear(detalle: Detalle): Observable<any> {
    return this.httpClient.post<Detalle>('/api/detalle/' + 'guardar', detalle);
  }

  listarDetalleFactura(id:number):Observable<Detalle[]>{
    return this.httpClient.get<Detalle[]>('api/detalle/'+`obtenerPorFactura/${id}`);
  }


}
