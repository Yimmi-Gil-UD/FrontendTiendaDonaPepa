import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { ProductoDTO } from '../models/producto-dto';
import { InformacionProductosDTO } from '../models/informacion-productos-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

productoUrl = 'http://localhost:9898/api/productos/'


  constructor(
    private httpClient:HttpClient
  ) { }

  /*public crear(producto:Producto){
    return this.httpClient.post(this.productoUrl + 'guardar',producto);
  }*/
  
  crear(producto: Producto): Observable<any> {
    return this.httpClient.post<Producto>('api/productos/' + 'guardar', producto);
  }

  listar(): Observable<ProductoDTO[]> {
    return this.httpClient.get<ProductoDTO[]>('api/productos/listar');
  }

  eliminar(id:number): Observable<any>{
    return this.httpClient.delete<any>('api/productos/'+`eliminar/${id}`);
  }

  /*eliminar(id:number): Observable<any>{
    return this.httpClient.delete<any>(this.productoUrl+`eliminar/${id}`)
  }*/

  actualizar(id: number, producto:Producto): Observable<any>{
    return this.httpClient.put<any>('api/productos/'+`actualizar/${id}`, producto);
  }

  buscarPorId(id:number): Observable<ProductoDTO> {
    return this.httpClient.get<ProductoDTO>('api/productos/'+`obtenerId/${id}`);
  }

  /*actualizar(id: number, producto:Producto): Observable<any>{
    return this.httpClient.post<Producto>('api/productos/'+`actualizar/${id}`, producto);
  }*/

  listarProductosMasVendidos():Observable<InformacionProductosDTO[]>{
    return this.httpClient.get<InformacionProductosDTO[]>('api/productos/productosMasVendidos');
  }


}
