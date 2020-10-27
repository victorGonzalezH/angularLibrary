
/*
  Author: victor.gonzalez@metricsfab.com
  Creation date: 10/01/2020

  Resumen:
    Servicio que permite y administra los mensajes entre componentes o cualquier objeto que
    inyecte este servicio. Este servicio es util para mandar y recibir mensajes desde componentes
    (dentro de la misma aplicacion) que no son padre-hijo explicitamente, por ejemplo componentes
    que se resuelven dinamicamente mediante el Router
*/

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {


  //Propiedades
  private messagesSource: Subject<string> = new Subject();

  private messenger = this.messagesSource.asObservable();

  constructor() 
  { 
  
      
  }


//Funciones
public sendStringMessage(message: string)
{
    this.messagesSource.next(message);
}


public sendNumberMessage(message: number)
{
    
}

public  getStringsMessenger(): Observable<string>
{
    return this.messenger;
}

}
