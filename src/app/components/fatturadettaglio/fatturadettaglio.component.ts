import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Interface
 */
import { Fattura } from 'src/app/interface/fattura';

/**
 * Service
 */
import { FattureService } from 'src/app/service/fatture.service';

@Component({
  selector: 'app-fatturadettaglio',
  templateUrl: './fatturadettaglio.component.html',
  styleUrls: ['./fatturadettaglio.component.scss']
})
export class FatturadettaglioComponent implements OnInit {

  public fatturedett?: Fattura[]
  response: any
  id!: number
  fatture!: Fattura[]
  public currentPage: number = 0

  constructor(private fattureService: FattureService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id = +params['id']
      this.getFatturaByClient(this.id)
    })


  }

  getFatturaByClient(id: number) {
    this.fattureService.getFatturaByClient(id, 0).subscribe(fatturadett => {
      this.response = fatturadett
      this.fatture = this.response.content
    })
  }

  public deleteFatturaCliente(idFattura: number, i:number) {
    this.fattureService.deleteFatturaCliente(idFattura).subscribe(c=> {
      this.router.navigate(['/clients'])
      this.fatture?.splice(i, 1)
    })
  }


  changePage(p: number, direction: any) {
    if(false === direction) {
      this.currentPage = this.currentPage - 1
      p = this.currentPage
    }
    if(true === direction) {
      this.currentPage = this.currentPage + 1
      p = this.currentPage
    }

    console.log(p)
    this.fattureService.getFatturaByClient(this.id, p).subscribe(getFattureResponse =>{
      this.response = getFattureResponse
      this.fatture = getFattureResponse.content
    })
  }

  counter (p:number) {
    return new Array(p)
  }



}
