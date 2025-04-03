import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../auth/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('../tab1/tab1.page').then(m => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () => import('../tab2/tab2.page').then(m => m.Tab2Page),
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.page').then(m => m.LoginPage)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
