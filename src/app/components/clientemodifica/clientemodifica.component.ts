import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Service
 */
import { ClientService } from 'src/app/service/client.service';

/**
 * Interface
 */
import { Cliente } from 'src/app/interface/cliente';

/**
 * Form
 */
import { ClienteForm, normalizeRequest } from 'src/app/form/cliente.form';

@Component({
  selector: 'app-clientemodifica',
  templateUrl: './clientemodifica.component.html',
  styleUrls: ['./clientemodifica.component.scss']
})
export class ClientemodificaComponent implements OnInit {
  public cliente?: Cliente
  id!: number
  clienteForm!: FormGroup
  public comuni: Array<any> = [
    {
        "id": 1,
        "nome": "LASTRA A SIGNA",
        "provincia": {
            "id": 1,
            "nome": "FIRENZE",
            "sigla": "FI"
        }
    },
    {
        "id": 2,
        "nome": "SCANDICCI",
        "provincia": {
            "id": 1,
            "nome": "FIRENZE",
            "sigla": "FI"
        }
    },
    {
        "id": 3,
        "nome": "PALESTRINA",
        "provincia": {
            "id": 2,
            "nome": "ROMA",
            "sigla": "RM"
        }
    }
]


  constructor(private clienteService: ClientService,
    private router: Router,
    private route: ActivatedRoute) {
      this.clienteForm = ClienteForm
    }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id']
      this.getClientById(this.id)
    })
  }

  getClientById(id: number) {
    this.clienteService.getClientById(id).subscribe(clientdett => {
      this.cliente = clientdett
      console.log(this.cliente)
      this.clienteForm.patchValue({
        id: this.cliente?.id,
        ragioneSociale: this.cliente?.ragioneSociale,
        partitaIva: this.cliente?.partitaIva,
        tipoCliente: this.cliente?.tipoCliente,
        email: this.cliente?.email,
        pec: this.cliente?.pec,
        telefono: this.cliente?.telefono,
        nomeContatto: this.cliente?.nomeContatto,
        cognomeContatto: this.cliente?.cognomeContatto,
        telefonoContatto: this.cliente?.telefonoContatto,
        emailContatto: this.cliente?.emailContatto,
        via: this.cliente?.indirizzoSedeOperativa?.via,
        civico: this.cliente?.indirizzoSedeOperativa?.civico,
        cap: this.cliente?.indirizzoSedeOperativa?.cap,
        localita: this.cliente?.indirizzoSedeOperativa?.localita,
        comune: this.cliente?.indirizzoSedeOperativa?.comune.id

      })
    })

  }

  save() {
    const formData = normalizeRequest(this.clienteForm.value, this.comuni)
    this.clienteService.saveClient(formData, this.id).subscribe(saveclient=>{
      this.router.navigate(['/clients'])

    })
  }



}


