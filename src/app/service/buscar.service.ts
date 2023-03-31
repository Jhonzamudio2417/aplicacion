import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BuscarService {
  constructor(private http: HttpClient) {}

  urlApi = 'http://localhost:8080/api/buscar/';

  Buscar(coleccion: any, termino: any) {
    return this.http.get(this.urlApi + coleccion + '/' + termino);
  }
}
