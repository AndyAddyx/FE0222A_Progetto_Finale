/**
 * Angular
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

/**
 * RxJs
 */
import { Observable } from 'rxjs'

  /**
 * Interfaces
 */
import { Fattura } from '../interface/fattura';

/**
 * Env
 */
 import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  private pathApi: string

  constructor(
    private http: HttpClient
  ) {
    this.pathApi = environment.pathApi
   }

   getFatture(p:number) {
    return this.http.get<any>(this.pathApi + '/api/fatture?page=' + p + '&size=20&sort=id,ASC')

   }

   getFatturaByClient(id: number, p: number) {
    return this.http.get<any>(this.pathApi + '/api/fatture/cliente/' + id + '?page=' + p + '&size=20&sort=id,ASC')

  }

  getFatturaById(id:number){
    return this.http.get<any>(this.pathApi + '/api/fatture/' + id)

  }

  saveFattura(data: any, id: number) {
    return this.http.put<any>(this.pathApi + '/api/fatture/' + id, data)
  }

  deleteFattura(id:number) {
    return this.http.delete(this.pathApi + '/api/fatture/' + id)
  }

  deleteFatturaCliente(id: number) {
    return this.http.delete(this.pathApi + '/api/fatture/' + id)
  }

  addFattura(data: any) {
    return this.http.post<any>(this.pathApi + '/api/fatture', data)

  }




}
