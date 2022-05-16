import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import UserProf from 'src/app/models/UserProf';
import { LaboSujet } from '../../services/labo-sujet.service';


@Component({
  selector: 'app-sujets',
  templateUrl: './sujets.component.html',
  styleUrls: ['./sujets.component.css']
})

export class SujetsComponent implements OnInit {

  public closeResult: string = '';

  public isFetchingItems = true;
  public sujet_:string = '';
  public formationDoctorale_:string = '';
  public sujets_:Sujet[] = [];
  public page: number = 1;
  public itemsCount: number | undefined;

  constructor(private modalService: NgbModal, private operationsService: LaboSujet) { }
  
  public form = new FormGroup({
    titre: new FormControl("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl("", [Validators.required, Validators.minLength(3)]),
    coDirecteur: new FormControl(""),
    formationDoctorale: new FormControl("", [Validators.required])
  })

  ngOnInit(): void {
     this.getAllSujets();
  }

  getAllSujets() {
  
  this.operationsService.getSubjects().then(x=>{
    this.sujets_ = x.results;    
    this.isFetchingItems = false;
  })
    
  }


  // search partie

  searchFormation() {
    if (this.formationDoctorale_ === '') {
      this.ngOnInit();
    } else {
      this.sujets_ = this.sujets_.filter((res) => {
        return res.formationDoctorale.titre
          .toLocaleLowerCase()
          .match(this.formationDoctorale_.toLocaleLowerCase());
      });
    }
  }

  // delete sujet

  deleteSujet(sujet:Sujet){

    alert('hello')
    this.operationsService.deleteSujet(sujet.id).then(res=>{
      console.log(res);
      alert(res);
    })

  }

  searchSujet() {
    if (this.sujet_ === '') {
      this.ngOnInit();
    } else {
      this.sujets_ = this.sujets_.filter((res) => {
        return res.titre
          .toLocaleLowerCase()
          .match(this.sujet_.toLocaleLowerCase());
      });
    }
  }

  onIndexChange(offset: number) {
    if (this.isFetchingItems) return;
    this.isFetchingItems = true;
    this.operationsService
      .getSubjects(offset)
      .then((d) => {
        this.sujets_ = d.results;
      })
      .finally(() => (this.isFetchingItems = false));
  }


// modals partie 

  // fun = (content: any, s: Sujet) => {
  //   this.sujet2 = s
  //   this.form.setValue({
  //     titre: s.titre,
  //     description: s.description,
  //     coDirecteur: null,
  //     formationDoctorale: null
  //   });
  //   this.open(content)
  // }
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

}
