import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../models/media';
import { environment } from 'src/environments/environment';
import { MediaType } from '../models/media-type';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getMedia(
    mediatype: MediaType,
    pageNumber: Number,
    searchInput: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiUrl}/Media?type=${mediatype}&PageNumber=${pageNumber}&search=${searchInput}`
    );
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/Media?getAll=1`);
  }

  addMedia(media: Media): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/Media`, media);
  }

  uploadImage(image: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/Media/Upload`, image);
  }

  rate(id: number, rating: number) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/Media/${id}/rating`,
      rating
    );
  }
}
