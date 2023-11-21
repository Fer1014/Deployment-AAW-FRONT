import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { HttpHeaders } from '@angular/common/http';
import { Usuarios } from '../models/usuarios';
import { environment } from 'src/environments/environment';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = `${base_url}/users`;

  constructor(private http: HttpClient) { }

  login(request: JwtRequest) {
    return this.http.post("http://localhost:8080/authenticate", request);
  }
  verificar() {
    let token = sessionStorage.getItem("token");
    return token != null;
  }
  showRole(){
    let token = sessionStorage.getItem("token");
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }

  showUsername(){
    let token = sessionStorage.getItem("token");
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.sub;
  }
  obtenerUserxUsername(username: string) {
    console.log("Usuario a consultar ...");
    console.log("Usuario a consultar (id)" + username);
    
    let token = sessionStorage.getItem('token');
    return this.http.get<Usuarios>(`${this.url}/${username}`, {
      headers: new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'),
    });
  }
}
