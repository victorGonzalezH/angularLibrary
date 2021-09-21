import { Injectable } from '@angular/core';
import { IAuthenticationService } from './interfaces/authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  /**
   * Indica la ruta de la pagina a la que se navegara si la autenticacion no es exitosa
   */
  get authenticationFailureRoute() {

    return this.authenticationFailureRouteLocal;
  }

  /**
   * Indica la ruta a la que se navegara si la autenticacion del usuario es exitosa
   */
  get authenticationSuccessRoute() {
    return this.authenticationSuccessRouteLocal;
  }

  /**
   * 
   */
  get userAuthenticatedKey() {
    return this.userAuthenticatedKeyLocal;
  }

  constructor() { }


  private authenticationFailureRouteLocal: string;

  private authenticationSuccessRouteLocal: string;

  private userAuthenticatedKeyLocal: string;

  private authenticationServiceLocal: IAuthenticationService;

  get authenticationService(): IAuthenticationService
  {
    return this.authenticationServiceLocal;
  }

/**
 *  Agrupa los elementos de un arreglo
 * @param list arreglo
 * @param keyGetter llave propiedad para hacer el agrupamiento
 */
public static groupBy(list: Array<any>, keyGetter: any) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });

    return map;
}


/**
 * 
 * @param obj 
 * @param prop 
 */
public static hasOwnProperty<X extends {}, Y extends PropertyKey>
  (obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}


/**
 * 
 * @param authenticationSuccessRoute authentication success route. Route to navigate when a user is successfully authenticated in the authentication guard
 * @param afr authentication failure route. Route to navigate when a user is failed authenticated in the authentication guard
 * @param userAuthenticatedKey user authenticated key. User key to be used in the authentication guard to get the current user in the localStorage
 * @param authenticationService servicio de autenticacion que se usa para las operaciones de autenticacion en los interceptores
 */
public configureUtils(authenticationSuccessRoute: string, authenticationFailureRoute: string, userAuthenticatedKey: string, authenticationService: IAuthenticationService): void {
 this.authenticationSuccessRouteLocal = authenticationSuccessRoute;
 this.authenticationFailureRouteLocal = authenticationFailureRoute;
 this.userAuthenticatedKeyLocal = userAuthenticatedKey;
}

}

