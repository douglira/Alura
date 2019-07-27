import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppMaterialModule } from '../app-material.module';

import { FilterByDescriptionPipe } from './photo-list/filter-by-description.pipe';

import { PhotoComponent } from './photo/photo.component';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotosComponent } from './photo-list/photos/photos.component';
import { LoadButtonComponent } from './photo-list/load-button/load-button.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    HttpClientModule,
  ],
  declarations: [
    PhotoComponent,
    PhotoListComponent,
    PhotoFormComponent,
    PhotosComponent,
    FilterByDescriptionPipe,
    LoadButtonComponent
  ],
  exports: [
    PhotoListComponent
  ]
})
export class PhotosModule {  }
