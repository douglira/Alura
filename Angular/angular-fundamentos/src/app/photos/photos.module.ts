import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app-material.module';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  imports: [
    AppMaterialModule
  ],
  declarations: [
    PhotoComponent
  ],
  exports: [
    PhotoComponent
  ]
})
export class PhotosModule {  }
