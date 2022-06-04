import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

/**
 * RxJs
 */
import { Observable } from 'rxjs'

/**
 * Interface
 */
import { SignUpRequest } from './../../interface/signup.request'
import { SignUpResponse } from './../../interface/signup.response'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent
  implements OnInit {
  isLoading = false
  errorMessage = undefined
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onsubmit(form:NgForm)
  {
    const signUpRequest: SignUpRequest = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      role: [form.value.role]
    }

    this.isLoading = true
    const signUpObservable$: Observable<SignUpResponse> = this.authSrv.signup(signUpRequest)
    signUpObservable$.subscribe(subscribeResponse => {
      form.reset()
      this.isLoading = false
      this.errorMessage = undefined
      this.router.navigate(['/'])
    })
  }
}
