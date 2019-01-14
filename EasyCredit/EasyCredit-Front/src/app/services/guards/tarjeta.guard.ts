import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaGuard implements CanActivate {

  constructor(
    public router: Router
   ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // preguntar en BD <--
    let tarjetaCredito =  JSON.parse( localStorage.getItem('tarjetaCredito') );
    tarjetaCredito = Number(tarjetaCredito);

    if ( tarjetaCredito === 0 ) {

      if ( (state.url === '/solicitar-credito') ) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;

    }

  return true;
  }
}
