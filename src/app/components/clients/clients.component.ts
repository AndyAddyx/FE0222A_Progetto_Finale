import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * RxJs
 */
 import { Observable } from 'rxjs'

 /**
 * Interface
 */
import { Cliente } from 'src/app/interface/cliente';

/**
 * Service
 */
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public clients?: Cliente[]
  response: any
  idClient!: number

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
   this.clientService.getClients(0).subscribe(client=> {
     this.response = client
     this.clients = client.content
   })
  }

  public deleteClient(idCliente: number, i:number) {
    this.clientService.deleteClient(idCliente).subscribe(c=> {
      this.router.navigate(['/clienti'])
      this.clients?.splice(i, 1)



    })
  }

  changePage(p: number) {
    this.clientService.getClients(p).subscribe(getClientsResponse =>{
      this.response = getClientsResponse
      this.clients = getClientsResponse.content
    })
  }

  counter (p:number) {
    return new Array(p)
  }

}
