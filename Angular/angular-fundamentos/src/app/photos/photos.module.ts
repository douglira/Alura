import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app-material.module';
import { PhotoComponent } from './photo/photo.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    AppMaterialModule,
    HttpClientModule
  ],
  declarations: [
    PhotoComponent
  ],
  exports: [
    PhotoComponent
  ]
})
export class PhotosModule {  }
