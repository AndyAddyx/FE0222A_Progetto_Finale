import { Component, OnInit } from '@angular/core';
import { NgForm, UntypedFormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

/**
 * Interface
 */
   import { Fattura } from 'src/app/interface/fattura';

/**
 * Service
 */
import { FattureService } from 'src/app/service/fatture.service';

/**
 * Form
 */
import { FatturaForm } from 'src/app/form/fattura.form';



@Component({
  selector: 'app-fatturamodifica',
  templateUrl: './fatturamodifica.component.html',
  styleUrls: ['./fatturamodifica.component.scss']
})
export class FatturamodificaComponent implements OnInit {

  public fattura?: Fattura
  id!: number
  fatturaForm!: UntypedFormGroup

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

  constructor(private fattureService: FattureService,
      private router: Router,
      private route:ActivatedRoute,
      private datePipe: DatePipe) {
    this.fatturaForm = FatturaForm
   }


  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id']
      this.getFatturaById(this.id)
    })
  }

  getFatturaById(id: number) {
    this.fattureService.getFatturaById(id).subscribe(fatturadett => {
      this.fattura = fatturadett
      this.fatturaForm.patchValue({
        data: this.datePipe.transform(this.fattura?.data),
        numero: this.fattura?.numero,
        anno: this.fattura?.anno,
        importo: this.fattura?.importo,
        stato: this.fattura?.stato.id
      })
    })

  }

  save() {
    console.log(this.fatturaForm)
    const formData = this.normalizeRequest(this.fatturaForm.value)
    console.log(formData)
    this.fattureService.saveFattura(formData, this.id).subscribe(savefatt=>{
      this.router.navigate(['/fatturadettaglio/', this.fattura?.cliente?.id])

    })

  }

  private normalizeRequest(formData: any) {
    console.log(formData)
    return {
      id: this.fattura?.id,
      data: this.fattura?.data,
      numero: formData.numero,
      anno: formData.anno,
      importo: +formData.importo,
      stato: this.availableStates.reduce((acc, item)=>{
        if(formData.stato == item.id) {
          acc = item
        }
        return acc
      }),
      cliente: this.fattura?.cliente
    }

  }


}
