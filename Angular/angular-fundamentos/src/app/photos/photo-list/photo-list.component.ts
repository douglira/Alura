import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  searchFilter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  username: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {  }

  ngOnInit(): void {
    // this.activatedRoute
    //   .data
    //   .subscribe(({ photos }: { photos: Photo[] }) => {
    //     this.photos = photos
    //   });
    this.username = this.activatedRoute.snapshot.params.username
    this.photos = this.activatedRoute.snapshot.data['photos'];
  }

  load(): void {
    this.photoService
      .listFromUserPaginated(this.username, ++this.currentPage)
      .subscribe(photos => {
        this.searchFilter = '';
        this.photos = [...this.photos, ...photos];
        this.hasMore = !!photos.length;
      })
  }
}
