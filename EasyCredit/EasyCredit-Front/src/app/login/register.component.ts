
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
// para poder indicar el tipo ngForm
import {NgForm} from '@angular/forms';

// Servicios
import { UsuarioService } from '../services/service.index';
// Modelo
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {


   // Variables
   username: string;
   edad: number;

  constructor(
    public router: Router,
    public _usuarioService:  UsuarioService,
  ) { }

  ngOnInit() {
}

// METODOS

  // Login normal
  Registrarse( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    this.username =  this.username.replace(/\s*/g, "");
    const usuario = new Usuario( forma.value.username, forma.value.edad );

    this._usuarioService.crearUsuario( usuario )
      .subscribe( res => {
        // console.log( res );
        this.router.navigate( ['/login'] );
      });


  }

  noWhiteSpace() {
    this.username = this.username || '';
    this.username =  this.username.replace(/\s*/g, "");
    console.log(this.username);
  }

}
