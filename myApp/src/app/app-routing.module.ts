import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PhotoTestComponent } from './photo-test/photo-test.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'photo-test',
    pathMatch: 'full'
  },
  {
    path: 'photo-test',
    component: PhotoTestComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }