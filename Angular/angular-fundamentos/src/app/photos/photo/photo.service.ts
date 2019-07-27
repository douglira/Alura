import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Photo } from './photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor (private http: HttpClient) {
    this.http = http
  }

  public listFromUser(username: string) {
    return this.http
      .get<Photo[]>(`${environment.apiUrl}/${username}/photos`);
  }
}
