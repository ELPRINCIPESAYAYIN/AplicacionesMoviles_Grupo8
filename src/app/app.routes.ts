import { loginGuard } from './guards/login.guard';
import { Routes } from '@angular/router';
import { homeGuard } from './guards/home.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full',
  },
//como  que falta todo¿
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage),
  },
  {
    path: 'theme',
    loadComponent: () => import('./pages/theme/theme.page').then( m => m.ThemePage)
  },
  
  {
    path: 'pregunta',
    loadComponent: () => import('./pages/pregunta/pregunta.page').then( m => m.PreguntaPage)
  },
  {
    path: 'correcto',
    loadComponent: () => import('./pages/correcto/correcto.page').then( m => m.CorrectoPage)
  },
  {
    path: 'incorrecto',
    loadComponent: () => import('./pages/incorrecto/incorrecto.page').then( m => m.IncorrectoPage)
  },
  {
    path: 'correo',
    loadComponent: () => import('./pages/correo/correo.page').then( m => m.CorreoPage)
   
  },
  {
    path: 'ingreso',
    loadComponent: () => import('./pages/ingreso/ingreso.page').then( m => m.ingresoPage),
    canActivate: [loginGuard]
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage),
    canActivate: [homeGuard]
  },
  {
    path: 'miruta',
    loadComponent: () => import('./pages/miruta/miruta.page').then( m => m.mirutaPage)
  },
  {
    path: 'miclase',
    loadComponent: () => import('./pages/miclase/miclase.page').then( m => m.MiclasePage)
  },
  {
    path: 'correo-incorrecto',
    loadComponent: () => import('./pages/correo-incorrecto/correo-incorrecto.page').then( m => m.CorreoIncorrectoPage)
  },
  {
    path: 'registrarme',
    loadComponent: () => import('./pages/registrarme/registrarme.page').then( m => m.RegistrarmePage)
  },
  
 
];
