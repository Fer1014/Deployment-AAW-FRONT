import { ProyectosDesarrolladorDTO } from './../models/ProyectosDesarrolladorDTO';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyectos } from '../models/proyecto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private url = `${base_url}/proyectoss`;
  private ListaCambio = new Subject<Proyectos[]>();
  constructor(private http: HttpClient) { }
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Proyectos[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(p: Proyectos) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, p, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(ListaNueva: Proyectos[]) {
    this.ListaCambio.next(ListaNueva);
  }
  getList() {
    return this.ListaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Proyectos>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(u: Proyectos) {
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

  

  buscar(fecha: string): Observable<Proyectos[]> {
    let token = sessionStorage.getItem('token');
    return this.http.post<Proyectos[]>(
      `${this.url}/buscar`,
      { fecha: fecha },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }

  getCount():Observable<ProyectosDesarrolladorDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<ProyectosDesarrolladorDTO[]>(`${this.url}/cantidades`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });

  }
}
