import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:9898/api/categoria/';

  constructor(
    private httpClient:HttpClient
  ) { }


  /*public listar():Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(this.categoriaUrl + 'listar');
  }*/

  public listar(){
    return this.httpClient.get<Categoria[]>(this.categoriaUrl + 'listar');
  }

}
