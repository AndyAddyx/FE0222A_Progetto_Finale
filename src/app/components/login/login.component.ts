import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs'
import { filter} from 'rxjs/operators'

/**
 * Interfaces
 */
import { LoginResponse } from './../../interface/login.response'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false
  errorMessage = undefined
  private userObservable$: Observable<LoginResponse|null>

  constructor(private authSrv: AuthService, private router: Router) {
    this.userObservable$ = this.authSrv.user$.pipe(
      filter(loginResponse => null !== loginResponse)
    )
  }

  ngOnInit(): void {
    this.subscribeTouserSessionData()
    this.authSrv.applyCurrentSession()
  }

  subscribeTouserSessionData() {
    this.userObservable$.subscribe(loginResponse => {
      this.router.navigate(['/'])
    })
  }

  onsubmit(form:any){
    console.log(form.value)

    this.authSrv.login(form.value).subscribe(
      res=>{
      form.reset()
      this.errorMessage = undefined
      this.router.navigate(['home'])


  } )}}
