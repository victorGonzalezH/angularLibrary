import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from '../utils.service';
import { StorageService } from '../services/storage.service';
import { StorageType } from '../services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private utilsService: UtilsService, private storageService: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.utilsService.authenticationService.getUser();
        const isLoggedIn = currentUser && currentUser.token;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}