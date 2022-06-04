import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms'

export const ClienteForm = new FormGroup({
  ragioneSociale: new FormControl(
    '',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  partitaIva: new FormControl('',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  email: new FormControl('',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  tipoCliente: new FormControl('',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  pec: new FormControl(''),
  telefono: new FormControl(''),
  nomeContatto: new FormControl(''),
  cognomeContatto: new FormControl(''),
  telefonoContatto: new FormControl(''),
  emailContatto: new FormControl('',
    Validators.compose([
      Validators.required,
      /*Validators.minLength(3)*/
    ])
  ),
  via: new FormControl(''),
  civico: new FormControl(''),
  cap: new FormControl(''),
  localita: new FormControl(''),
  comune: new FormControl('',
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
