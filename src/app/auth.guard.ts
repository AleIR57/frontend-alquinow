import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(public authService: AuthService, public router: Router){

    }
  

    canActivate(): boolean{
      if(this.authService.loggedIn()){
        return true;
      }

      this.router.navigate(['/inicio-sesion']);
    }
  
}
