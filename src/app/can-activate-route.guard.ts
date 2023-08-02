import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateRouteGuard implements CanActivate {
  constructor(private authServe : AuthenticationService,
    private goToHome : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authServe.check===true)
    {
      return true;
    }
    else
    {  
      this.goToHome.navigateByUrl("home");
      return false;
    }
  }  
}
