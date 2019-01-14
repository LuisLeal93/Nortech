import { Component, OnInit } from '@angular/core';

// Obtencion de datos
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  // Variable
  data: Usuario;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.data = this._usuarioService.usuario;
  }

}
