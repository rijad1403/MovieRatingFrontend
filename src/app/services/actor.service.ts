import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actor } from '../models/actor';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Actors`);
  }

  add(actor: Actor): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Actors`, actor);
  }
}
