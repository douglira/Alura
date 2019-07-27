import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = environment.apiUrl

  constructor (private http: HttpClient) {
    this.http = http
  }

  public listFromUser(username: string) {
    return this.http
      .get<Photo[]>(`${this.apiUrl}/${username}/photos`);
  }

  public listFromUserPaginated(username: string, page: number) {
    const params = new HttpParams()
      .append('page', page.toString());

    return this.http
      .get<Photo[]>(
        `${this.apiUrl}/${username}/photos`,
        { params }
      )
  }
}
