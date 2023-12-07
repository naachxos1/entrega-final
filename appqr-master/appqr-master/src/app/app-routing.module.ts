import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './app1/guards/no-auth.guard';
import { AuthGuard } from './app1/guards/auth.guard';
import { NoAuthGuards } from './app2/guards/no-auths.guard';
import { AuthGuards } from './app2/guards/auth.guards';



const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    
  }, 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, 
  {
    path: 'asignar-usuario',
    loadChildren: () => import('./asignar-usuario/asignar-usuario.module').then( m => m.AsignarUsuarioPageModule)
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./app1/pages/auth/sing-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./app1/pages/auth/auth.module').then( m => m.AuthPageModule), canActivate:[NoAuthGuard]
  },
  {
    path: 'home1',
    loadChildren: () => import('./app1/pages/auth/home1/home1.module').then( m => m.Home1PageModule), canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./app1/pages/auth/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
  path: 'noticia',
  loadChildren: () => import('./app1/pages/auth/noticia/noticia-routing.module').then( m => m.NoticiaPageRoutingModule)
},
{
path: 'lista-seccion',
loadChildren: () => import('./app1/pages/auth/lista-seccion/lista-seccion-routing.module').then( m => m.ListaSeccionPageRoutingModule)
},
{
path: 'seccion',
loadChildren: () => import('./app1/pages/auth/seccion/seccion-routing.module').then( m => m.SeccionPageRoutingModule)
},
{
path: 'mapa',
loadChildren: () => import('./app1/pages/auth/mapa/mapa.module').then( m => m.MapaPageModule)
},
{
path: 'escaner',
loadChildren: () => import('./app1/pages/auth/escaner/escaner.module').then( m => m.EscanerPageModule)
},
{
path: 'generar-qr',
loadChildren: () => import('./app1/pages/auth/generar-qr/generar-qr.module').then( m => m.GenerarQRPageModule)
},

/////////////////////////app 2//////////////////////////
, 
  {
    path: 'asignar-usuario',
    loadChildren: () => import('./asignar-usuario/asignar-usuario.module').then( m => m.AsignarUsuarioPageModule)
  },
  {
    path: 'sing-up',
    loadChildren: () => import('./app1/pages/auth/sing-up/sing-up.module').then( m => m.SingUpPageModule)
  },
  {
    path: 'auth2',
    loadChildren: () => import('./app2/pages/auth2/auth2.module').then( m => m.Auth2PageModule), canActivate:[NoAuthGuards]
  },
  {
    path: 'home2',
    loadChildren: () => import('./app2/pages/auth2/home2/home2.module').then( m => m.Home2PageModule), canActivate:[AuthGuards]
  },
  {
    path: 'profile',
    loadChildren: () => import('./app2/pages/auth2/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
  path: 'noticia',
  loadChildren: () => import('./app2/pages/auth2/noticia/noticia-routing.module').then( m => m.NoticiaPageRoutingModule)
},
{
path: 'lista-seccion',
loadChildren: () => import('./app2/pages/auth2/lista-seccion/lista-seccion-routing.module').then( m => m.ListaSeccionPageRoutingModule)
},
{
path: 'seccion',
loadChildren: () => import('./app2/pages/auth2/seccion/seccion-routing.module').then( m => m.SeccionPageRoutingModule)
},
{
path: 'mapa',
loadChildren: () => import('./app2/pages/auth2/mapa/mapa.module').then( m => m.MapaPageModule)
},
{
path: 'escaner',
loadChildren: () => import('./app2/pages/auth2/escaner/escaner.module').then( m => m.EscanerPageModule)
},
{
path: 'generar-qr',
loadChildren: () => import('./app2/pages/auth2/generar-qr/generar-qr.module').then( m => m.GenerarQrPageModule)
},
{
  path: 'prueba',
  loadChildren: () => import('./app2/pages/auth2/prueba/prueba.module').then( m => m.PruebaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  