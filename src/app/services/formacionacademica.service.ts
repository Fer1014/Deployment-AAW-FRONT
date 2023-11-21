import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormacionAcademica } from '../models/formacionacademica';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class FormacionacademicaService {
  private url = `${base_url}/formacionacademica`;
  private listaCambio = new Subject<FormacionAcademica[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<FormacionAcademica[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(fa: FormacionAcademica) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, fa,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: FormacionAcademica[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<FormacionAcademica>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(fa: FormacionAcademica) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, fa,{
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
