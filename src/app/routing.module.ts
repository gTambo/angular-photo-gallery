import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosPageComponent } from './photos-page/photos-page.component';
import { FileAddComponent } from './file-add/file-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/photos', pathMatch: 'full' },
  { path: 'photos', component: PhotosPageComponent },
  { path: 'fileadd', component: FileAddComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
