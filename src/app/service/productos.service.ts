import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) {}

  private urlApi = 'http://localhost:8080/api/productos/';
  private httpOptions = {
    headers: new HttpHeaders({
      'x-token': 'Bearer ' + sessionStorage.getItem('x-token'),
    }),
  };

  ProductosGetAll(limit: any) {
    return this.http.get(this.urlApi + '?_page=1&_limit=' + limit);
  }

  ProductosGetById(id: any) {
    return this.http.get(this.urlApi + id);
  }

  ProductosCreate(data: any) {
    return this.http.post(this.urlApi, data, this.httpOptions);
  }

  ProductosUpdate(id: any, data: any) {
    return this.http.put(this.urlApi + id, data, this.httpOptions);
  }

  ProductosDelete(id: any) {
    return this.http.delete(this.urlApi + id, this.httpOptions);
  }
}
