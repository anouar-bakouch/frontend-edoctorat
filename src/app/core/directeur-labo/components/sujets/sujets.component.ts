import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import swal from 'sweetalert';
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
  public errorText:string = '';
  public alert: AlertData | undefined = undefined;
  public formations !: Result<FormationDoctorale>;
  public professors !: Result<Professeur>;

  constructor (
    private modalService: NgbModal,
    private fservice: RxFormBuilder,
    private operationsService: LaboSujet
    ) { }
  
  public dLaboform = <RxFormGroup>this.fservice.group({

    titre  :['',Validators.required],
    professeur : ['',Validators.required],
    coDirecteur : [''],
    formationDoctoraleId : ['',Validators.required]

   })

  ngOnInit(): void {
     this.getAllSujets();
     this.getFormationsDoctorales();
     this.getProfessors();
  }

  getAllSujets() {
  
  this.operationsService.getSubjects().then(x=>{
    this.sujets_ = x.results;    
    this.isFetchingItems = false;
    
  })
    
  }

  getFormationsDoctorales(){

  this.operationsService.getFormationsDoctorales().then(res=>{
     this.formations = res;
  })

  }

  getProfessors(){

  this.operationsService.getProfesseurs().then(res=>{
    this.professors = res;
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

  // add sujet 

  addSujet(){

    const sujetLabo = this.dLaboform.toFormData();
    console.log(sujetLabo);
    this.operationsService.addSujet(sujetLabo)
    .then(res=>{
        this.sujets_.push(res as Sujet);
    })
    .catch((_)=>{
      console.log(_);
    })
    .finally()

  }
  

  // delete sujet

  deleteSujet(sujet:Sujet){

    this.operationsService.deleteSujet(sujet.id).then(res=>{
      const index = this.sujets_.indexOf(sujet);
      this.sujets_.splice(index,1);
      swal({
        icon: 'success',
      })
      
    }).catch((_) => {
      this.alert = {
        type: 'loading',
        message: "error lors de la suppression",
      };
    })
    .finally(() => {
      setTimeout(() => (this.alert = undefined), 3000);
    }

    );

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
