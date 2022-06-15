import { UntypedFormGroup, Validators, UntypedFormControl, ValidatorFn, AbstractControl } from '@angular/forms'

export const FatturaForm = new UntypedFormGroup({
  data: new UntypedFormControl(
    '',
    Validators.compose([
      /*Validators.required,
      Validators.minLength(3)*/
    ])
  ),
  numero: new UntypedFormControl(''),
  anno: new UntypedFormControl(''),
  importo: new UntypedFormControl(''),
  stato: new UntypedFormControl(''),
})

/*export const OrderFormValidationMessages = {
  name: [
    { type: 'required', message: 'Name is required.' }
  ],
  address: [
    { type: 'required', message: 'Address is required.' }
  ]

}*/
