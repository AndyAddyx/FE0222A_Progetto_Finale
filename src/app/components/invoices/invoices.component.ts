import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * RxJs
 */
import { Observable } from 'rxjs'


  /**
 * Interface
 */
import { Fattura } from 'src/app/interface/fattura';

/**
 * Service
 */
import { FattureService } from 'src/app/service/fatture.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  public fatture?: Fattura[]
  response: any
  id!: number
  idFattura!: number
  public currentPage: number = 0


  constructor(private fattureService: FattureService, private router: Router) { }

  ngOnInit(): void {
    this.fattureService.getFatture(0).subscribe(fattura=>{
      this.response = fattura
      this.fatture = fattura.content
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
    this.fattureService.getFatture(p).subscribe(getFattureResponse =>{
      this.response = getFattureResponse
      this.fatture = getFattureResponse.content
    })
  }

  counter (p:number) {
    return new Array(p)
  }

  public deleteFattura(idFattura: number, i:number) {
    this.fattureService.deleteFattura(idFattura).subscribe(c=> {
      this.router.navigate(['/fatture'])
      this.fatture?.splice(i, 1)
    })
  }

}
