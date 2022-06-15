import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { UntypedFormGroup } from '@angular/forms';

/**
 * Form
 */
 import { ClienteForm, normalizeRequest } from 'src/app/form/cliente.form';

 /**
 * Service
 */
import { ClientService } from 'src/app/service/client.service';


@Component({
  selector: 'app-clientenuovo',
  templateUrl: './clientenuovo.component.html',
  styleUrls: ['./clientenuovo.component.scss']
})
export class ClientenuovoComponent implements OnInit {

  clienteForm!: UntypedFormGroup
  public cliente: any
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
    private router: Router) {
  this.clienteForm = ClienteForm
  console.log(this.comuni)
 }

  ngOnInit(): void {
  }

  save() {
    const formData = normalizeRequest(this.clienteForm.value, this.comuni)
    this.clienteService.addClient(formData).subscribe(client=>{
      this.router.navigate(['/clients'])

    })
  }
}
