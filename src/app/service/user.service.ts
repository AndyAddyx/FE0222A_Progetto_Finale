/**
 * Angular
 */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

/**
 * RxJs
 */
import { Observable } from 'rxjs'

/**
 * Interfaces
 */
import { GetUsersRequest } from './../interface/getusers.request'
import { GetUsersResponse } from './../interface/getusers.response'

/**
 * Env
 */
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService
{
  private pathApi: string

  constructor(
    private http: HttpClient
  ) {
    this.pathApi = environment.pathApi
  }

  getUsers( p: number): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(`${this.pathApi}/api/users?page=${p}&size=20`)
  }
}
