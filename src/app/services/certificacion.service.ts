import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Certificaciones } from '../models/certificacion';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CertificacionService {
  private API_URL = `${base_url}/certificaciones`;
  private listaCambio = new Subject<Certificaciones[]>();
  constructor(private http: HttpClient) { }

  list(): Observable<Certificaciones[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<Certificaciones[]>(this.API_URL,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(certificacion: Certificaciones): Observable<any> {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.API_URL, certificacion,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: Certificaciones[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Certificaciones[]> {
    return this.listaCambio.asObservable();
  }

  listId(id_Certificaciones: number): Observable<Certificaciones> {
    let token = sessionStorage.getItem('token');

    return this.http.get<Certificaciones>(`${this.API_URL}/${id_Certificaciones}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(certificacion: Certificaciones): Observable<any> {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.API_URL, certificacion,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  delete(id_Certificaciones: number): Observable<any> {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.API_URL}/${id_Certificaciones}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  
}
