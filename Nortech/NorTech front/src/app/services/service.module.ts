/* Compactar los servicios dentro de un mismo modulo */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Peticiones HTTP, ya que usuario service lo usa.
// Se exportan todos los modulos que usaran los demas modulos, como FormsModule para usar ngForm y CommonModule
import { HttpClientModule } from '@angular/common/http';


import {
  SidebarService,
  UsuarioService,
  CompetenciaService,
  AuthGuard,
 } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService,
    UsuarioService,
    CompetenciaService,
    AuthGuard
  ],
  declarations: []
})
export class ServiceModule { }
