// APROXIMACION POR TEMPLATE
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
// para poder indicar el tipo ngForm
import {NgForm} from '@angular/forms';

// Modelo
import { Credito } from '../../models/credito.model';
// Servicios
import { CreditoService } from '../../services/credito/credito.service';

@Component({
  selector: 'app-solicitar-credito',
  templateUrl: './solicitar-credito.component.html',
  styles: []
})
export class SolicitarCreditoComponent implements OnInit {

  // variables
montoCredito: number;
plazoCredito = 3;
pInteres = 5;
montoInteres = 0;
totalPagar = 0;

username: string;
tarjetaCredito: any;

  constructor(
    public router: Router,
    public _creditoService:  CreditoService
  ) {
   }

  ngOnInit() {
    this.username =  JSON.parse( localStorage.getItem('username') );
    this.tarjetaCredito =  JSON.parse( localStorage.getItem('tarjetaCredito') );
  }

// METODOS

  calculaMonto( clickOptions: number ) {

    if (clickOptions === 0) {
      const form = document.getElementById('frmOptions');
      this.plazoCredito = form['options'].value;
    } else {
      this.plazoCredito = clickOptions;
    }

    // Tasa interes
    if ( this.montoCredito === 0 || this.montoCredito === undefined ) {
      this.fTasaInteres();
      this.montoInteres = 0;
      this.totalPagar = 0;
      this.montoInteres = 0;
    } else {
      this.fTasaInteres();
      this.montoInteres = ((this.montoCredito * this.pInteres) / 100);
      this.totalPagar = this.montoCredito + this.montoInteres;
    }


  }

  fTasaInteres() {
    if ( this.plazoCredito === 3 ) {
      this.pInteres = 5;
    } else if ( this.plazoCredito === 6 ) {
      this.pInteres = 7;
    } else if ( this.plazoCredito === 9 )  {
      this.pInteres = 12;
    }
  }

  crearPeticion( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    // *  validacion de la tarjeta de credito en BD aqui <--

    // Obtener datos
    const username = JSON.parse( localStorage.getItem('username') );
    const peticionValores = new Credito(username, this.plazoCredito , this.montoCredito);

    this._creditoService.crearPeticion( peticionValores )
      .subscribe( res => {
         // console.log( res );
      });


  } // Fin ingresar

}
