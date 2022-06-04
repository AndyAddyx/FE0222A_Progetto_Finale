import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms'

export const FatturaForm = new FormGroup({
  data: new FormControl(
    '',
    Validators.compose([
      /*Validators.required,
      Validators.minLength(3)*/
    ])
  ),
  numero: new FormControl(''),
  anno: new FormControl(''),
  importo: new FormControl(''),
  stato: new FormControl(''),
})

/*export const OrderFormValidationMessages = {
  name: [
    { type: 'required', message: 'Name is required.' }
  ],
  address: [
    { type: 'required', message: 'Address is required.' }
  ]

}*/
