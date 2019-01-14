import { Injectable } from '@angular/core';
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

export class UsuarioService {

  usuario: Usuario;

  // inyectar peticiones HTTP
  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
   }

   // Metodos

   estaLogueado() {
     // Comprobar contra la base de datos <--
     return ( localStorage.getItem('usuario') ) ? true : false;
   }

   cargarStorage() {

     if ( localStorage.getItem('usuario')) {
       this.usuario = JSON.parse( localStorage.getItem('usuario') );
      } else {
        this.usuario = null;
      }

   }

   guardarStorage( usuario: Usuario ) {
    localStorage.setItem( 'usuario', JSON.stringify( usuario ));
    localStorage.setItem( 'username', JSON.stringify( usuario[0].username ));
    localStorage.setItem( 'tarjetaCredito', JSON.stringify( usuario[0].tarjetaCredito ));
    this.usuario = usuario;
   }

   crearUsuario( usuario: Usuario ) {

    // Emulando las peticiones del postMan
    const url =  URL_SERVICIOS + '/usuario';
    // regresando un observador
    return this.http.post( url, usuario )
      .pipe(
          map( (resp: any) => {
            swal('Usuario creado', usuario.username , 'success' );
            return resp.usuario; // resp.ok, usuario, usuarioToken. lo que mandemos por el backend
            }),
          catchError( err => {
            // console.log(err);
              swal('Error!', err.error.mensaje + ': ' + err.error.errors , 'error' );
              return throwError( err.error.mensaje ); // Este viene siendo el error de mi backend en usuarios
            })
        );

    }// Fin crearUsuario

    login( usuario: Usuario  ) {

      const url = URL_SERVICIOS + `/usuario/${usuario.username}`;

      return this.http.get( url )
        .pipe(
          // Guardando en localStorage del navegador
          map( (res: any) => {
            this.guardarStorage( res.usuario );
            return res.ok;
          }),
          catchError( err => {
            swal('Error!', err.error.mensaje, 'error' );
            return throwError( err.error.mensaje );
          })
        );

    }

    logOut() {

      this.usuario = null;
      localStorage.clear();
      this.router.navigate(['/login']);

    }

}
