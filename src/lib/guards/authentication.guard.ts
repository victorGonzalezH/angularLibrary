import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageType, StorageService } from '../services/storage.service';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {


  constructor(private router: Router, private storageService: StorageService, private utilsService: UtilsService) {

  }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user: any = this.storageService.retrieve(this.utilsService.userAuthenticatedKey, StorageType.Session);
    if (user) {

      return true;
    }

    // El usuario no esta autenticado, asi que se redirecciona a la pagina que se indique el servicio utils
    this.router.navigate([this.utilsService.authenticationFailureRoute], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
