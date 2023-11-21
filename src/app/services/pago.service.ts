import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pago } from '../models/pago';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
}) 

export class PagoService {
  private url = `${base_url}/pagos`;
  private ListaCambio = new Subject<Pago[]>();
  constructor(private http: HttpClient) { }
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Pago[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(p: Pago) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, p, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(ListaNueva: Pago[]) {
    this.ListaCambio.next(ListaNueva);
  }
  getList() {
    return this.ListaCambio.asObservable();
  }
  update(u: Pago) {
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

  buscar(fecha: string): Observable<Pago[]> {
    let token = sessionStorage.getItem('token');
    return this.http.post<Pago[]>(
      `${this.url}/buscar`,
      { fecha: fecha },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
}
