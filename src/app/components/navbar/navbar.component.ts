import { Component, OnInit } from '@angular/core';

/**
 * Interfaces
 */
import { LoginResponse } from './../../interface/login.response'

/**
 * Services
 */
import { AuthService } from './../../service/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: LoginResponse | null

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user)=>{
      this.user = user
    })
  }

  logout() {
    this.authSrv.logout()
  }
}