import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  url = 'http://localhost:9898/api/ciudad/';

  constructor(
    private httpClient:HttpClient
  ) { }

  listar():Observable<Ciudad[]>{
    return this.httpClient.get<Ciudad[]>(this.url+'listar');
  }


}
