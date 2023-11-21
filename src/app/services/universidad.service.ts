import { Injectable } from '@angular/core';
import { Universidad } from '../models/universidad';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { CantidadUniversidadesDTO } from '../models/CantidadUniversidadesDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UniversidadService {
  private url = `${base_url}/universidad`;
  private listaCambio = new Subject<Universidad[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<Universidad[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(uni: Universidad) {
    let token = sessionStorage.getItem('token');
    
    return this.http.post(this.url, uni,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  getCount():Observable<CantidadUniversidadesDTO> {
    let token = sessionStorage.getItem('token');

    return this.http.get<CantidadUniversidadesDTO>(`${this.url}/contar`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva: Universidad[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<Universidad>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(u: Universidad) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, u,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
