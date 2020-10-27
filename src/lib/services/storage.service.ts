/*
  Author: victor.gonzalez@metricsfab.com
  Creation date: 4/12/2019

  Resumen:
    Servicio que administra los valores guardados localmente o en la sesion

*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  static SESSION_STORAGE  = 0;
  static LOCAL_STORAGE    = 1;
  private localStorage: any;
  private sessionStorage: any;


  constructor() {

    this.sessionStorage = sessionStorage; // sessionStorage;
    this.localStorage = localStorage;     // localStorage
  }


  public retrieve(key: string, storageType?: number): any {

    let item = null;
    if (storageType == null)  {

      // Primero se trata de buscar el item en la sesion
      item = this.sessionStorage.getItem(key);

      if (item && item !== 'undefined' && item != 'undefined') {
        return JSON.parse(item);
      }

      // Si el item NO se encuentra en la sesion, entonces se busca localmente
      item = this.localStorage.getItem(key);

      if (item && item !== 'undefined' && item != 'undefined') {
        return JSON.parse(item);
      }

      // No se encuentra el elemento
      return null;
    } else {
      switch (storageType)  {
        case StorageService.SESSION_STORAGE:
          item = this.sessionStorage.getItem(key);
          if (item && item !== 'undefined') {
            return JSON.parse(this.sessionStorage.getItem(key));
          }
          break;

        case StorageService.LOCAL_STORAGE:
          item = this.localStorage.getItem(key);
          if (item && item !== 'undefined') {
            return JSON.parse(this.localStorage.getItem(key));
          }
          break;
      }


    }

    return null;
  }


  public store(key: string, value: any, storageType?: StorageType) {
    if (storageType == null) {
      this.sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      switch (storageType) {
        case StorageService.SESSION_STORAGE: this.sessionStorage.setItem(key, JSON.stringify(value)); break;
        case StorageService.LOCAL_STORAGE: this.localStorage.setItem(key, JSON.stringify(value)); break;

      }

    }

  }


}


export enum StorageType
{
  Session = 1,
  Local
}