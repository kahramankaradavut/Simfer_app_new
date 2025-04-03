import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { UserManagementPage } from './superAdmin/user-management.page';

export const routes: Routes = [
  
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tabs',
    // canActivate: [authGuard],
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes)
  },
  {
    path: 'superAdmin',
    // canActivate: [authGuard],
     loadChildren: () => import('./superAdmin/superAdmin.routes').then(m => m.routes)
   // loadComponent: () => import('./superAdmin/user-management.page').then(m => m.UserManagementPage),

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];
