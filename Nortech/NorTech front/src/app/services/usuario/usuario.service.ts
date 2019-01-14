import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// Sweet alert 1
import swal from 'sweetalert';

// constante http://localhost:3000
import { URL_SERVICIOS } from '../../config/config';

// Mapeo
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  usuario: Usuario;

  // inyectar peticiones HTTP
  constructor(
    public http: HttpClient,
    public router: Router
  ) {
      console.log('Servicio de usuario listo!');
   }

   // Metodos

   estaLogueado() {
     return ( this.usuario != null ) ? true : false;
   }

   crearUsuario( usuario: Usuario ) {

    // Emulando las peticiones del postMan
    const url =  URL_SERVICIOS + '/usuario';
    // regresando un observador
    return this.http.post( url, usuario )
      .pipe(
          map( (resp: any) => {
            swal('Usuario creado', usuario.username, 'success' );
            return resp.usuario; // resp.ok, usuario, usuarioToken. lo que mandemos por el backend
            }),
          catchError( err => {
              swal('Error!', err.error.mensaje, 'error' );
              return throwError( err.error.mensaje ); // Este viene siendo el error de mi backend en usuarios
            })
        );

    }// Fin crearUsuario

    // Login Normal
    login( usuario: Usuario, checkbox: boolean  ) {

      const url = URL_SERVICIOS + '/login';

      return this.http.post( url, usuario )
        .pipe(
          // Guardando en localStorage del navegador
          map( (res: any) => {

            this.usuario = res.usuario;
            return res.ok;
          }),
          catchError( err => {
            swal('Error!', err.error.mensaje, 'error' );
            return throwError( err.error.mensaje );
          })
        );

    } // Fin login

    logOut() {
      this.usuario = null;
      this.router.navigate(['/login']);
    }


}
