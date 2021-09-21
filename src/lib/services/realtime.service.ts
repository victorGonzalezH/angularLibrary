/**
 * Author: victor.gonzalez@metricsfab.com
 * 
 * Servicio wrapper para tiempo real. Este servicio usa la libreria socket.io client para enviar  y
 * recibir mensajes en tiempo real desde/hacia un servidor socket.io server.
 */
import { Injectable } from '@angular/core';
import  io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
/**
 * Realtime service that wraps socket.io functionalities
 */
export class RealtimeService {

  private localUrl: string;

  get url() { return this.localUrl; }

  private localIsConnected: boolean;

  /**
   * Indicates if the service was initialized/Indica se el servicio ha sido inicilizado
   */
  get isConnected() {return this.localIsConnected; }

  private readonly noConnectedMessage = 'Socket no connected, please use connect method before use socket methods';

  private localEmitAcknowledgements: Subject<any>;

  
  /**
   * Observable para los "agradecimiento" o respuestas de vuelta que se generan cuando se envia
   * un mensaje 
   * */

  get emitAcknowledgements(): Observable <any> {
    return this.localEmitAcknowledgements.asObservable();
  }

  private socket: any;


  /**
   * Objeto de los observables que se usa para los eventos
   */
  private eventsObservables: Record<string, Observable<any>>;



  constructor() {
    
    this.localIsConnected = false;
    this.localEmitAcknowledgements = new Subject();
    this.eventsObservables = {};
  }


  /**
   * 
   * @param url 
   * @param bearerToken 
   */
  public connect(url: string, bearerToken?: string): boolean {
    
    // Verificar con alguna expresion regular que la url es correcta
    if(bearerToken != undefined) {
      const socketOptions = {
        origins: '*:*',
        transportOptions: {
          polling: {
            extraHeaders: 
            {
              'x-clientid': 'Bearer ' + bearerToken,
            }
          }
        }
     };
  
      this.socket = io(url, socketOptions );
    }
    else {

      this.socket = io(url);
    }

    if (this.socket !== undefined || this.socket !== null) {
      this.localIsConnected = true;
    }

    return true;
  }

  

  /**
   * Agrega un evento para escuchar los mensajes provenientes de el
   * @param event nombre del evento
   */
  public addEvent(event: string): Observable<any> {

    // Si la propiedad no existe
    if(this.eventsObservables[event] == undefined) {
      
      this.eventsObservables[event] = new Observable(observer => {

        // Si el socket esta conectado, entonces, agrega el evento
        if (this.localIsConnected === true) {
          this.socket.on(event,
            data => {
                        observer.next(data);
                    }
         );
        }  else {

          observer.error(this.noConnectedMessage);

        }
     });
    
    }
    

    return this.eventsObservables[event];

  }


  /**
   * Envia un mensaje al servidor. Para recibir las confirmaciones de los datos enviados
   * es necesario suscribirse al observable emitAcknowledgements
   * @param data Dato para enviar al servidor.
   * 
   */
  public emit(data: any) {

    // Si el socket esta conectado, entonces, agrega el evento
    if (this.localIsConnected === true) {
      this.socket.emit(data, acknowledgement => {

          this.localEmitAcknowledgements.next(acknowledgement);
      });
    }  else {
      this.localEmitAcknowledgements.error(this.noConnectedMessage);
    }

  }

}
