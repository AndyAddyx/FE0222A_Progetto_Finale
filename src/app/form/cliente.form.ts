import { UntypedFormGroup, Validators, UntypedFormControl, ValidatorFn, AbstractControl } from '@angular/forms'

export const ClienteForm = new UntypedFormGroup({
  ragioneSociale: new UntypedFormControl(
    '',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  partitaIva: new UntypedFormControl('',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  email: new UntypedFormControl('',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  tipoCliente: new UntypedFormControl('',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  pec: new UntypedFormControl(''),
  telefono: new UntypedFormControl(''),
  nomeContatto: new UntypedFormControl(''),
  cognomeContatto: new UntypedFormControl(''),
  telefonoContatto: new UntypedFormControl(''),
  emailContatto: new UntypedFormControl('',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  via: new UntypedFormControl(''),
  civico: new UntypedFormControl(''),
  cap: new UntypedFormControl(''),
  localita: new UntypedFormControl(''),
  comune: new UntypedFormControl('',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  )
})

export function normalizeRequest(formData: any, comuni: any) {
  return {
    ragioneSociale: formData.ragioneSociale,
    partitaIva: formData.partitaIva,
    tipoCliente: formData.tipoCliente,
    email: formData.email,
    pec: formData.pec,
    telefono: formData.telefono,
    nomeContatto: formData.nomeContatto,
    cognomeContatto: formData.cognomeContatto,
    telefonoContatto: formData.telefonoContatto,
    emailContatto: formData.emailContatto,
    indirizzoSedeOperativa: {
        via: formData.via,
        civico: formData.civico,
        cap: formData.cap,
        localita: formData.localita,
        comune: comuni.reduce((acc: any, item: any)=>{
          if(formData.comune == item.id) {
            acc = item
          }
          return acc
        })
    }
  }
}
