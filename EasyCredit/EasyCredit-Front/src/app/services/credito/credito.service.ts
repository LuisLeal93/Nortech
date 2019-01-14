import { Injectable } from '@angular/core';
import { Credito } from '../../models/credito.model';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// Sweet Alert
import swal from 'sweetalert';

// constante http://localhost:3000
import { URL_SERVICIOS } from '../../config/config';

// Mapeo
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  credito: Credito;
  usuario: Usuario;

  // inyectar peticiones HTTP
  constructor(
    public http: HttpClient,
    public router: Router
  ) {

      // this.usuario = JSON.parse( localStorage.getItem('usuario') );
   }

   // Metodos

   // Actualizar Tarjeta
   actualizarTarjeta( usuario: Usuario ) {

    const url = URL_SERVICIOS + `/usuario`;

    return this.http.put( url, usuario )
      .pipe(
        // Guardando en localStorage del navegador
        map( (res: any) => {
          // localStorage.setItem( 'usuario', JSON.stringify( usuario ));
          localStorage.setItem( 'tarjetaCredito', JSON.stringify( usuario.tarjetaCredito ));
          swal( 'Configuracion exitosa', 'cambios Guardados', 'success' );
          return res.ok;
        }),
        catchError( err => {
          swal('Error!', err.error.mensaje, 'error' );
          return throwError( err.error.mensaje );
        })
      );

  }

   cargarPeticiones( credito: Credito ) {

    const url = URL_SERVICIOS + `/credito/${credito.username}`;

    return this.http.get( url )
        .pipe(
          map( (res: any) => {
            return res.creditos[0];
          }),
          catchError( err => {
            swal('Error!', err.error.mensaje, 'error' );
            return throwError( err.error.mensaje );
          })
        );

   }


   crearPeticion( credito: Credito ) {

    // Emulando las peticiones del postMan
    const url =  URL_SERVICIOS + '/credito';
    // regresando un observador
    return this.http.post( url, credito )
      .pipe(
          map( (resp: any) => {
            swal('Peticion creada', 'Solicitud Enviada', 'success' );
            return resp.credito;
            }),
          catchError( err => {
            console.log(err);
              swal('Error!', err.error.mensaje + ': ' + err.error.errors , 'error' );
              return throwError( err.error.mensaje );
            })
        );

    }

} // fin
