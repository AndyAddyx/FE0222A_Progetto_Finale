import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup } from '@angular/forms';

/**
 * Form
 */
import { FatturaForm } from 'src/app/form/fattura.form';

/**
 * Service
 */
import { FattureService } from 'src/app/service/fatture.service';
import { ClientService } from 'src/app/service/client.service';
import { Fattura } from 'src/app/interface/fattura';

@Component({
  selector: 'app-fatturanuova',
  templateUrl: './fatturanuova.component.html',
  styleUrls: ['./fatturanuova.component.scss']
})
export class FatturanuovaComponent implements OnInit {

  id!: number
  cliente!: any

  fatturaNuovaForm!: FormGroup
  public availableStates: Array<any> = [
    {
      "id": 1,
      "nome": "PAGATA"
    },
    {
      "id": 2,
      "nome": "NON PAGATA"
    }

  ]

  constructor (
    public fattureService: FattureService,
    private router: Router,
    private route:ActivatedRoute,
    private clientService: ClientService
  ) {
    this.fatturaNuovaForm = FatturaForm
    }

   ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['idcliente']
      this.clientService.getClientById(this.id).subscribe(clientdata => {
        this.cliente = clientdata
        console.log(this.cliente)
      })
    })
  }


  save() {
    const formData = this.fatturaNuovaForm.value
    this.fattureService.addFattura(this.normalizeRequest(formData)).subscribe(fatt=>{
      this.router.navigate(['/clients'])

    })

  }

  private normalizeRequest(formData: any) {
    console.log(formData)
    return {
      data: formData.data,
      numero: formData.numero,
      anno: formData.anno,
      importo: formData.importo,
      stato: this.availableStates.reduce((acc, item)=>{
        if(formData.stato == item.id) {
          acc = item
        }
        return acc
      }),
      cliente: this.cliente
    }

  }




}
