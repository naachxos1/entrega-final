import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./sing-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'noticia',
    loadChildren: () => import('./noticia/noticia.module').then( m => m.NoticiaPageModule)
  },
  {
    path: 'noticia',
    loadChildren: () => import('./noticia/noticia.module').then( m => m.NoticiaPageModule)
  },
  {
    path: 'seccion',
    loadChildren: () => import('./seccion/seccion.module').then( m => m.SeccionPageModule)
  },
  {
    path: 'lista-seccion',
    loadChildren: () => import('./lista-seccion/lista-seccion.module').then( m => m.ListaSeccionPageModule)
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./generar-qr/generar-qr.module').then( m => m.GenerarQRPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'escaner',
    loadChildren: () => import('./escaner/escaner.module').then( m => m.EscanerPageModule)
  },
  {
   path: 'home1',
   loadChildren: () => import('./home1/home1.module').then( m => m.Home1PageModule)
 },
 {
  path: 'profile',
  loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
