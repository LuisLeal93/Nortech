
// Compactar los servicios dentro de un mismo modulo

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Peticiones HTTP, ya que usuario service lo usa.
import { HttpClientModule } from '@angular/common/http';

import {
  UsuarioService,
  CreditoService,
  AuthGuard,
  TarjetaGuard
 } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    CreditoService,
    AuthGuard,
    TarjetaGuard
  ],
  declarations: []
})
export class ServiceModule { }
