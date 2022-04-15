import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Sujet } from 'src/app/models/Sujet';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: '[app-prof-sujet]',
  templateUrl: './prof-sujet.component.html',
  styleUrls: ['./prof-sujet.component.css']
})

export class ProfSujetComponent implements OnInit {
  public sujets: Sujet[] = []

  ngOnInit(): void {
    this.getAllSujets()
  }

  closeResult: string = '';

  constructor(private modalService: NgbModal, private operationsService: OperationsService) { }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  getAllSujets() {
    this.operationsService.getSujets().subscribe(data => {
      console.log(data);
      this.sujets = data;
      console.log(this.sujets)
    })
  }
}
