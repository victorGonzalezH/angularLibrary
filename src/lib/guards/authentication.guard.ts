import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageType, StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate 
{
  

  constructor(private router: Router, private storageService: StorageService)
  {

  }

  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {

    if (this.storageService.retrieve('currentUser', StorageType.Session))
    {
        return true;
    }

    return true;
  }
  
}
