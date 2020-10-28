/*
  Author:             Victor Gonzalez
  email:              victor.gonzalez@metricsfab.com
  fecha de creacion:  25/10/2020
  Description:        Servicio generico para las peticiones de datos a los servicios de backend
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

export enum DataServiceProtocols {

  NONE = '',
  HTTP = 'http',
  HTTPS = 'https'

}


export enum ResponseTypes {

  ARRAY_BUFFER  = 'arraybuffer',
  BLOB          = 'blob',
  JSON          = 'json',
  TEXT          = 'text'

}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Funciones
  constructor(private http: HttpClient) {

  }


  public get(url: string, params?: Array<{ name: string, value: any }>, method?: string, protocol: DataServiceProtocols = DataServiceProtocols.HTTP, responseType: ResponseTypes  = ResponseTypes.JSON, token: string = null) {


    if (url) {

      // Se declaran los encabezados
    const headers = new HttpHeaders({  'Content-Type':  'application/json' });

    // Si existe un token de autorizacion entonces se agrega a los encabezados
    if (token) {
      headers.set('Authorization', token);
    }

    let completeUrl = url;
    // Si la url no empieza con http o no empieza con https se concatena el protocolo que se haya pasado como
    // parametro
    if (!url.startsWith('http') || url.startsWith('https')) {

      if (protocol !== DataServiceProtocols.NONE) {
        completeUrl = protocol + '://' + url;
      }

    }

    // Si se especifica un metodo en particular se anexa a la url
    if (method) {
        completeUrl += '/' + method;
      }


    let httpParams = new HttpParams();
    if (params) {
        params.forEach(param => {
          // Si el parametro es un arreglo de datos
          if (Array.isArray(param.value)) {

            param.value.forEach(paramItem => {
                httpParams = httpParams.append(param.name, paramItem);
            });
          } else {
            httpParams = httpParams.append(param.name, param.value.toString());
          }

        });
      }


    let responseTypeLocal: any;
    switch (responseType) {
        case ResponseTypes.ARRAY_BUFFER:
          responseTypeLocal = 'arraybuffer';
          break;
        case ResponseTypes.BLOB:
          responseTypeLocal = 'arraybuffer';
          break;
        case ResponseTypes.JSON:
          responseTypeLocal = 'json';
          break;
        case ResponseTypes.TEXT:
          responseTypeLocal = 'text';
          break;
      }

    return this.http.get(completeUrl, { headers,  params: httpParams, responseType: responseTypeLocal});


  } else { // Si no se proporciona un url
      return of([]);
    }
  }



  public post(url: string, body: any, method: string, protocol: DataServiceProtocols = DataServiceProtocols.HTTP, responseType: ResponseTypes  = ResponseTypes.JSON, token: string = null) {

  if (url) {
     // Se declaran los encabezados
     const headers = new HttpHeaders({  'Content-Type':  'application/json' });

     // Si existe un token de autorizacion entonces se agrega a los encabezados
     if (token) {
       headers.set('Authorization', token);
     }

     let completeUrl = url;
    // Si la url no empieza con http o no empieza con https se concatena el protocolo que se haya pasado como
    // parametro
     if (!url.startsWith('http') || url.startsWith('https')) {

      if (protocol !== DataServiceProtocols.NONE) {
        completeUrl = protocol + '://' + url;
      }

    }

    // Si se especifica un metodo en particular se anexa a la url
     if (method) {
        completeUrl += '/' + method;
      }

     let responseTypeLocal: any;
     switch (responseType) {
          case ResponseTypes.ARRAY_BUFFER:
            responseTypeLocal = 'arraybuffer';
            break;
          case ResponseTypes.BLOB:
            responseTypeLocal = 'arraybuffer';
            break;
          case ResponseTypes.JSON:
            responseTypeLocal = 'json';
            break;
          case ResponseTypes.TEXT:
            responseTypeLocal = 'text';
            break;
        }

     return this.http.post(completeUrl, body, { headers, responseType: responseTypeLocal })
     .pipe(catchError(this.handleError));

} else {
  return of([]);
}

  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }



}

