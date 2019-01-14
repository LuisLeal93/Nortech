import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
// para poder indicar el tipo ngForm
import {NgForm} from '@angular/forms';

// Obtencion de datos
import { Usuario } from '../../models/usuario.model';
import { Credito } from '../../models/credito.model';
import { UsuarioService } from '../../services/service.index';
import { CreditoService } from '../../services/service.index';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {


  credito: Credito;
  resultado: any;
  arrPendiente: Array<any> = [];
  arrAcpRec: Array<any> = [];

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public _creditoService: CreditoService
  ) {

   /*  this.actualizarDashboard().then(
      Mensaje => console.log('Termino', Mensaje)
    )
    .catch(
      errores => console.error('Error en la promesa: ', errores)
    ); */

   }

  ngOnInit() {
    this.obtenerCreditosUsuario();
  }


  // Metodos

  obtenerCreditosUsuario() {
    const username = JSON.parse( localStorage.getItem('username') );

    this.credito = new Credito(username);

    this._creditoService.cargarPeticiones( this.credito )
      .subscribe( res => {
         this.resultado = res;

         // Filtrado de datos: pendiente / aceptado y rechazado
          for (let i = 0; i < this.resultado.length; i++) {
            if (this.resultado[i].estado === 'pendiente') {
              this.arrPendiente.push(this.resultado[i]);
            } else {
              this.arrAcpRec.push(this.resultado[i]);
            }
          }

      });
  }

  tieneTarjeta() {
    const tarjetaCredito = JSON.parse( localStorage.getItem('tarjetaCredito') );

    if ( tarjetaCredito !== 1 ) {
      swal( 'Debes de asociar una tarjeta', 've a configuraciones', 'warning' );
    }
  }


/*   actualizarDashboard(): Promise<boolean> {
    return new Promise( (resolve, reject) => {

      let contador = 0;
      const intervalo = setInterval( () => {

        contador += 1;

        if ( contador === 6) {
          // resolve( true );
          this.obtenerCreditosUsuario();
          this.arrPendiente = [];
          this.arrAcpRec = [];
          contador = 0;
        }
      }, 1000 );

    }); // fin promesa
  } */

}
