import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  urlApi = 'http://localhost:8080/api/auth/login/';

  Login(data: any) {
    return this.http.get(this.urlApi +'?correo='+data.correo+'&password='+data.password);
  }

  IsLogin() {
    return sessionStorage.getItem('x-token') != null;
  }
}
