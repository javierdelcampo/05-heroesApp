import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then ( m => m.AuthModule )    // Lazy load de los módulos de auth
                                                                                   // cuando invocan una URL bajo /auth/.. carga hijos
                                                                                   // definidos por el import promesa y carga authmodule
  },
  {
    path: 'heroes',
    loadChildren: () => import ('./heroes/heroes.module').then ( m => m.HeroesModule )
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    //component: ErrorPageComponent
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot ( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
