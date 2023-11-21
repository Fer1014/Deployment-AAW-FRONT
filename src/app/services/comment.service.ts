// comment.service.ts
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comentario } from '../models/comentario-puntuacion';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ValoracionPorUsuario } from '../models/valoracion';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = `${base_url}/comentario`;
  private listaCambio = new Subject<Comentario[]>();
  constructor(private http: HttpClient) {}

  list() {
    let token = sessionStorage.getItem('token');
    this.http.get<Comentario[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
    return this.http.get<Comentario[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    }); 
  }

  listbyUser(id: number) {
    let token = sessionStorage.getItem('token');
    //`${this.url}/${id}`
    return this.http.get<Comentario[]>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
    
  }

  insert(c: Comentario) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, c, {
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

  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  getValoracion(): Observable<ValoracionPorUsuario[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<ValoracionPorUsuario[]>(`${this.url}/valoracion`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }


}

