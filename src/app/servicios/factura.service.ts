import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

    constructor(
    private httpClient:HttpClient
  ) { }

  crear(factura:Factura):Observable<any>{
    return this.httpClient.post<any>('api/factura/'+'crear',factura);
  }


}
