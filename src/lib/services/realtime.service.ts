/**
 * Author: victor.gonzalez@metricsfab.com
 * 
 * Servicio wrapper para tiempo real. Este servicio usa la libreria socket.io client para enviar  y
 * recibir mensajes en tiempo real desde/hacia un servidor socket.io server.
 */
import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { from, Observable, Subject } from 'rxjs';
import { resolve } from 'url';

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

  constructor() {
    this.localIsConnected = false;
    this.localEmitAcknowledgements = new Subject();
  }


  public connect(url: string) {
    // Verificar con alguna expresion regular que la url es correcta
    this.socket = io(url);

    if (this.socket !== undefined || this.socket !== null) {
      this.localIsConnected = true;
    }
  }


  /**
   * Agrega un evento para escuchar los mensajes provenientes de el
   * @param event nombre del evento
   */
  public addEvent(event: string): Observable<any> {

    return new Observable(observer => {
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
