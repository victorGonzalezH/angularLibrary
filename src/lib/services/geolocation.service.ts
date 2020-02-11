/**
 * Author: victor.gonzalez@metricsfab.com
 * Description: Servicio para obtener la ubicacion del dispositivo
 *
 */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Servicio para obtener la ubicacion del dispositivo
 * Una vez instanciado el servicio use el metodo startWatching para inicializar la observacion de las ubicaciones
 * Podra subscribirse para obtener nuevas ubicaciones mediante el metodo getGeolocationObserver que devolvera el
 * observador de la posicion
 */
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  //
  geolocationSource: Subject<Position>;

  geolocationObs: Observable<Position>;

  isWatchingLocationProperty: boolean;

  constructor() {

    this.geolocationSource          =  new Subject();
    this.geolocationObs             = this.geolocationSource.asObservable();
    this.isWatchingLocationProperty = false;
    
  }


/**
 *
 * @param position Nueva posicion generada
 */
private success(position: Position) {

  this.geolocationSource.next(position);
  this.isWatchingLocationProperty = true;

}

/**
 * En caso de error se envia nulo como valor de la posicion
 */
private error() {

  this.geolocationSource.next(null);
}


/**
 * @param enableHighAccuracy Establece si se activa o no la exactitud alta
 // tslint:disable-next-line: max-line-length
  * @param maximumAge Valor positivo que indica el tiempo máximo en ms de una posición en caché que es valida. 0 = el dispositivo no puede usar caché, Infinito = sera una posición en caché. Predeterminado: 0.
  * @param timeout Valor positivo que indica el tiempo maximo en milisegundos que el dispositivo esperara
  * usara para obtener una nueva ubicacion
  */
 public startWatching(enableHighAccuracy: boolean, maximumAge: number, timeout: number): number {

  if (navigator.geolocation !== null) {

    navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this), { enableHighAccuracy, maximumAge, timeout });

    const watchId = navigator.geolocation.watchPosition(this.success.bind(this), this.error.bind(this),
    { enableHighAccuracy, maximumAge, timeout });
    return watchId;
  } else {
    this.isWatchingLocationProperty = false;
    return -1;
  }


}

/**
 * Obtiene el observador para que algun cliente se pueda suscribir
 */

public getGeolocationObserver(): Observable < Position > {
  return this.geolocationObs;
}


/**
* Indica si el servicio esta observando las nuevas ubicaciones o no
*/
public isWatchingLocation(): boolean {
return this.isWatchingLocationProperty;
}

}
