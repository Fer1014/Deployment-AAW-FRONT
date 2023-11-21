import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../models/usuarios';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRoleCountDTO } from '../models/UserRoleCountDTO';
import { Router } from '@angular/router';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = `${base_url}/users`;
  private listaCambio = new Subject<Usuarios[]>();
  constructor(private http: HttpClient, private router: Router) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Usuarios[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(uni: Usuarios) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, uni, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Usuarios[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  getCount():Observable<UserRoleCountDTO[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<UserRoleCountDTO[]>(`${this.url}/countByRoleDTO`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Usuarios>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(u: Usuarios) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, u, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  buscar(fecha: string): Observable<Usuarios[]> {
    let token = sessionStorage.getItem('token');
    return this.http.post<Usuarios[]>(
      `${this.url}/buscar`,
      { fecha: fecha },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
  comentario(id: number) {
    let token = sessionStorage.getItem('token');
    sessionStorage.setItem("idUsuarioComentario", id.toString());
    this.router.navigate(['components/administrador/dashboard/comentarios/listar']);
  }

}
