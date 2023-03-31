import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(private http: HttpClient) {}

  private urlApi = 'http://localhost:8080/api/categorias/';
  private httpOptions = {
    headers: new HttpHeaders({
      'x-token': 'Bearer ' + sessionStorage.getItem('x-token'),
    }),
  };

  CategoriasGetAll(limit: any) {
    return this.http.get(this.urlApi + '?_page=1&_limit=' + limit);
  }

  CategoriasGetById(id: any) {
    return this.http.get(this.urlApi + id);
  }

  CategoriasCreate(data: any) {
    return this.http.post(this.urlApi, data, this.httpOptions);
  }

  CategoriasUpdate(id: any, data: any) {
    return this.http.put(this.urlApi + id, data, this.httpOptions);
  }

  CategoriasDelete(id: any) {
    return this.http.delete(this.urlApi + id, this.httpOptions);
  }
}
