import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditDetailsComponent } from './edit-details/edit-details.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateRouteGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: EditDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return  component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
