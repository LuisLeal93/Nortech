import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
   ) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    console.log(state.url);

    if ( this._usuarioService.estaLogueado() ) {
      if ( (state.url === '/login') || (state.url === '/register')  ) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    } else {
      if ( (state.url === '/login') || (state.url === '/register')  ) {
        return true;
      }
      // Explicit navigation to any URL while not being authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }


} // class end


