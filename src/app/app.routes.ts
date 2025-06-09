import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: '',
    redirectTo: 'cadastro',
    pathMatch: 'full',
  },
    {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cliente-list',
    loadComponent: () => import('./pages/cliente-list/cliente-list.page').then( m => m.ClienteListPage)
  },
];
