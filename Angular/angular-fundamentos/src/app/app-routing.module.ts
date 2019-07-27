import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/users/flavio',
    pathMatch: 'full'
  },
  {
    path: 'users/:username',
    component: PhotoListComponent,
    resolve: {
      photos: PhotoListResolver
    }
  },
  {
    path: 'photos/form',
    component: PhotoFormComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [PhotoListResolver]
})
export class AppRoutingModule { }
