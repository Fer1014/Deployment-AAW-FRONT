import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ExperienciaLaboral } from '../models/experiencia_laboral';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {
  private API_URL = `${base_url}/experiencia_laboral`;
  private listaCambio = new Subject<ExperienciaLaboral[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<ExperienciaLaboral[]> {
    let token = sessionStorage.getItem('token');

    return this.http.get<ExperienciaLaboral[]>(this.API_URL,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(experienciaLaboral: ExperienciaLaboral) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.API_URL, experienciaLaboral,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: ExperienciaLaboral[]): void {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<ExperienciaLaboral[]> {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.delete(`${this.API_URL}?id=${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  update(experienciaLaboral: ExperienciaLaboral) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.API_URL, experienciaLaboral,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  listId(id_Experiencia_laboral: number): Observable<ExperienciaLaboral> {
    let token = sessionStorage.getItem('token');

    return this.http.get<ExperienciaLaboral>(`${this.API_URL}/${id_Experiencia_laboral}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
