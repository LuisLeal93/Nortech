
// APROXIMACION POR TEMPLATE
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
// para poder indicar el tipo ngForm
import {NgForm} from '@angular/forms';

// Modelo
import { Usuario } from '../../models/usuario.model';
// Servicios
import { CreditoService } from '../../services/credito/credito.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // variables
  dataUsuario: string;
  username: string;
  tarjetaCredito: any;

  constructor(
    public _creditoService:  CreditoService
  ) {
   }

  ngOnInit() {

    this.dataUsuario = JSON.parse( localStorage.getItem('usuario') );
    this.username =  JSON.parse( localStorage.getItem('username') );
    this.tarjetaCredito =  JSON.parse( localStorage.getItem('tarjetaCredito') );
  }

  // METODOS

  // Actualizar
  actualizarDatos( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const checkTarjetaCredito = this.tarjetaCredito;
    if ( checkTarjetaCredito === true || checkTarjetaCredito === 1 ) {
      this.tarjetaCredito = 1;
    } else { this.tarjetaCredito = 0; }

    const usuario = new Usuario(this.username, null, this.tarjetaCredito ); // llenar todos los datos.

    this._creditoService.actualizarTarjeta( usuario )
      .subscribe( res => {
         // console.log( res );
      });


  } // Fin ingresar

}
