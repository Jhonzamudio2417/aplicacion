import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  private urlApi = 'http://localhost:8080/api/usuarios/';

  UsuariosGetAll(limit: any) {
    return this.http.get(this.urlApi + '?_page=1&_limit=' + limit);
  }

  UsuariosGetById(id: any) {
    return this.http.get(this.urlApi + id);
  }

  UsuariosCreate(data: any) {
    return this.http.post(this.urlApi, data);
  }

  UsuariosUpdate(id: any, data: any) {
    return this.http.put(this.urlApi + id, data);
  }

  UsuariosDelete(id: any) {
    return this.http.delete(this.urlApi + id);
  }
}
