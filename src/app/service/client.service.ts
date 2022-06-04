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
import { Cliente } from '../interface/cliente';

/**
 * Env
 */
 import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private pathApi: string

  constructor(
    private http: HttpClient
  ) {
    this.pathApi = environment.pathApi
   }

   getClients(p:number) {
     return this.http.get<any>(this.pathApi + '/api/clienti/?page=' + p + '&size=20&sort=id,ASC')
   }

   getClientById(id: number) {
    return this.http.get<any>(this.pathApi + '/api/clienti/' + id)

   }

   deleteClient(id:number) {
    return this.http.delete(this.pathApi + '/api/clienti/' + id)
   }

  addClient(data: any) {
    return this.http.post<any>(this.pathApi + '/api/clienti', data)
  }

  saveClient(data: any, id: number) {
    return this.http.put<any>(this.pathApi + '/api/clienti/' + id, data)
  }
}
