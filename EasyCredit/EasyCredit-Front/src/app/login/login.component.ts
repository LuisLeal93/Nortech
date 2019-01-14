// APROXIMACION POR TEMPLATE

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
// para poder indicar el tipo ngForm
import {NgForm} from '@angular/forms';

// Servicios
import { UsuarioService } from '../services/service.index';
// Modelo
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

   // Variables
   username: string;
   edad: number;

  constructor(
    public router: Router,
    public _usuarioService:  UsuarioService,
  ) { }

  ngOnInit(
    // Cargar valores si es que hay un check de recuerdame
  ) {
}

// METODOS

  // Login normal
  Ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario( forma.value.username );

    this._usuarioService.login( usuario )
      .subscribe( res => {
        // console.log( res );
        this.router.navigate( ['/dashboard'] );
      });


  } // Fin ingresar

}
