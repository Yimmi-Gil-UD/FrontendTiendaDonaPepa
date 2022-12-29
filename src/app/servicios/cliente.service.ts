import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from '../models/cliente-dto';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url='http://localhost:9898/api/cliente/';

  constructor(
    private httpClient:HttpClient
  ) { }

  listar():Observable<ClienteDTO[]>{
    return this.httpClient.get<ClienteDTO[]>('api/cliente/'+'listar');
  }

  crear(cliente:Cliente):Observable<any>{
    return this.httpClient.post<Cliente>('api/cliente/'+'crear',cliente);
  }

  actualizar(id: number, cliente:Cliente): Observable<string>{
    return this.httpClient.put<any>('api/cliente/'+`actualizar/${id}`, cliente);
  }

   eliminar(id:number): Observable<any>{
    return this.httpClient.delete<any>('api/cliente/'+`eliminar/${id}`);
  }

  buscarPorDocumento(numDocumento:number): Observable<any>{
    return this.httpClient.get<any>('api/cliente/'+`buscarPorDocumento/${numDocumento}`);
  }

}
