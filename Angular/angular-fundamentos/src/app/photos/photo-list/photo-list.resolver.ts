import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {

  constructor(private photoService: PhotoService) {  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
    const { username } = route.params
    const page = Number(route.queryParams.page)

    return this.photoService.listFromUserPaginated(username, page || 1)
  }
}
