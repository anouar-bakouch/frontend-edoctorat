import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Inscription } from 'src/app/models/Inscription';
import Result from 'src/app/models/Result';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-prof-inscrits',
  templateUrl: './prof-inscrits.component.html',
  styleUrls: ['./prof-inscrits.component.css']
})


export class ProfInscritsComponent implements OnInit {
  public inscriptions: Inscription[] = [];
  public resultat: Result<Inscription> = {
    count: 0,
    next: '',
    previous: '',
    results: []
  }
  ngOnInit(): void {
    this.getMesInscrits()
  }

  closeResult: string = '';

  constructor(private modalService: NgbModal, private operationsService: OperationsService) {}
     

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  getMesInscrits() {
    this.operationsService.getMesInscrits().subscribe(data => {
      console.log(data)
      this.resultat = data;
      this.inscriptions = this.resultat.results
    })
  }
}
