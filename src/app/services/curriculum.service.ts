import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CurriculumVitae } from '../models/curriculum';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userCVDTO } from '../models/userCVDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  private url = `${base_url}/curriculumvitae`;
  private listaCambio = new Subject<CurriculumVitae[]>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');

    return this.http.get<CurriculumVitae[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(cv: CurriculumVitae) {
    let token = sessionStorage.getItem('token');

    return this.http.post(this.url, cv,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  setList(listaNueva: CurriculumVitae[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem('token');

    return this.http.get<CurriculumVitae>(`${this.url}/${id}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(cv: CurriculumVitae) {
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, cv,{
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
  buscar(fecha: string): Observable<CurriculumVitae[]> {
    let token = sessionStorage.getItem('token');
    return this.http.post<CurriculumVitae[]>(
      `${this.url}/buscar`,
      { fecha: fecha },
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
  getCount(): Observable<userCVDTO[]> {
    let token = sessionStorage.getItem('token');
    return this.http.get<userCVDTO[]>(`${this.url}/TotalUsersconCV`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

}
