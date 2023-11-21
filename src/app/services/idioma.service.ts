import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { idioma } from '../models/idioma';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
  private API_URL = `${base_url}/idiomas`;
  private listaCambio = new Subject<idioma[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<idioma[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<idioma[]>(this.API_URL,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(idioma: idioma){
    let token = sessionStorage.getItem('token');

    return this.http.post(this.API_URL, idioma,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: idioma[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<idioma[]> {
    return this.listaCambio.asObservable();
  }

  listId(id: number){
    let token = sessionStorage.getItem('token');

    return this.http.get<idioma>(`${this.API_URL}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(idioma: idioma) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.API_URL, idioma,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id: number){
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.API_URL}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
