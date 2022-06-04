import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './module/auth/auth.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Authinterceptor } from './components/interceptor/auth.interceptor';
import { AuthGuard } from './guard/auth.guard';
import { NgxPaginationModule } from 'ngx-pagination';



/**
 * Components
 */
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { SignupComponent } from './components/signup/signup.component'
import { UsersComponent } from './components/users/users.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { ClientsComponent } from './components/clients/clients.component'
import { InvoicesComponent } from './components/invoices/invoices.component';
import { FatturamodificaComponent } from './components/fatturamodifica/fatturamodifica.component';
import { FatturadettaglioComponent } from './components/fatturadettaglio/fatturadettaglio.component';
import { ClientenuovoComponent } from './components/clientenuovo/clientenuovo.component';
import { FatturanuovaComponent } from './components/fatturanuova/fatturanuova.component';
import { ClientemodificaComponent } from './components/clientemodifica/clientemodifica.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fatturamodifica/:id',
    component: FatturamodificaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clientemodifica/:id',
    component: ClientemodificaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fatturadettaglio/:id',
    component: FatturadettaglioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clientenuovo',
    component: ClientenuovoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fatturanuova/:idcliente',
    component: FatturanuovaComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UsersComponent,
    NavbarComponent,
    ClientsComponent,
    InvoicesComponent,
    FatturamodificaComponent,
    FatturadettaglioComponent,
    ClientenuovoComponent,
    FatturanuovaComponent,
    ClientemodificaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: Authinterceptor,
    multi:true
  },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
