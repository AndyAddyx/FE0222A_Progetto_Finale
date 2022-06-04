/**
 * Angular
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

/**
 * RxJS
 */
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators'

/**
 * Interfaces
 */
import { LoginRequest } from './../interface/login.request'
import { LoginResponse } from './../interface/login.response'
import { SignUpRequest } from './../interface/signup.request'
import { SignUpResponse } from './../interface/signup.response'


 export interface SignupData {
   name: string,
   surname: string,
   email: string,
   password: string
 }

 export interface LoginToken {
   access_token: string;
   refresh_token: string;
 }

 @Injectable({
   providedIn: 'root'
 })
 export class AuthService
 {


   private userStorageKey: string = 'user'
   private authSubject = new BehaviorSubject<null | LoginResponse>(null)
   user$ = this.authSubject.asObservable()
   isLoggedIn$ = this.user$.pipe(map(user=>!!user))

   pathApi: string

   constructor(private http:HttpClient, private router: Router ) {
     this.pathApi = environment.pathApi
     this.restore()
   }

   restore() {
    const user = localStorage.getItem('user');  //mi resta anche se refresho
    if (!user) {
      return;
    }
    const userdata: LoginResponse = JSON.parse(user);
    this.authSubject.next(userdata)
  }

   login(data: LoginRequest) {
     return this.http.post<LoginResponse>(`${this.pathApi}/api/auth/login`, data).pipe(tap(val =>{
       console.log(data)

     }),tap(data=>{
       this.authSubject.next(data)
       localStorage.setItem(this.userStorageKey, JSON.stringify(data))
     }))
   }

   getCurrentSession(): LoginResponse {
     const jsonData: any = localStorage.getItem(this.userStorageKey)
     return JSON.parse(jsonData)
   }

   applyCurrentSession() {
     let data: LoginResponse = this.getCurrentSession()
     this.authSubject.next(data)
   }

  signup(data: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.pathApi}/api/auth/signup`, data)
  }

   public logout() {
     localStorage.removeItem(this.userStorageKey)
     this.authSubject.next(null)
     this.router.navigate(['/'])
   }

   public refresh() {}
}
