import { Component, OnInit } from '@angular/core';

// navegacion
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

 constructor(
   public router: Router,
   public _usuarioService: UsuarioService
 ) { }

// logOut
 ngOnInit() {
 }

}
