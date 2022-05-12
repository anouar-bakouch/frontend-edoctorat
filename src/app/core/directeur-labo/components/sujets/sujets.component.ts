import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import UserProf from 'src/app/models/UserProf';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-sujets',
  templateUrl: './sujets.component.html',
  styleUrls: ['./sujets.component.css']
})
export class SujetsComponent implements OnInit {

  public sujets: Sujet[] = [];
  public professeurs: Professeur[] = [];
  public formationDoctorales: FormationDoctorale[] = [];

  public formationDoctorale: FormationDoctorale = {
    id: 0,
    ced: 0,
    etablissement: 0,
    axeDeRecherche: '',
    pathImage: '',
    titre: '',
    initiale: '',
    dateAccreditation: ''
  };

  user: UserProf = {
    username: '',
    first_name: '',
    last_name: ''
  };

  public prof: Professeur = {
    id: 0,
    nom: '',
    prenom: ''
  }
  public coDirecteur: Professeur = {
    id: 0,
    nom: '',
    prenom: ''
  }
  public currentProfesseur: Professeur = {
    id: 0,
    nom: '',
    prenom: ''
  }
  public sujet: Sujet = {
    id: 0,
    professeur: {
      id: 0,
      nom: '',
      prenom: ''
    },
    coDirecteur: {
      id: 0,
      nom: '',
      prenom: ''
    },
    titre: '',
    description: '',
    formationDoctorale: {
      id: 0,
      ced: 0,
      etablissement: 0,
      axeDeRecherche: '',
      pathImage: '',
      titre: '',
      initiale: '',
      dateAccreditation: ''
    },
    publier: false
  };
  public sujet2: Sujet = {
    id: 0,
    professeur: {
      id: 0,
      nom: '',
      prenom: ''
    },
    coDirecteur: {
      id: 0,
      nom: '',
      prenom: ''
    },
    titre: '',
    description: '',
    formationDoctorale: {
      id: 0,
      ced: 0,
      etablissement: 0,
      axeDeRecherche: '',
      pathImage: '',
      titre: '',
      initiale: '',
      dateAccreditation: ''
    },
    publier: false
  };
  public result: Result<any> = {
    count: 0,
    next: null,
    previous: null,
    results: []
  }

  public form = new FormGroup({
    titre: new FormControl("", [Validators.required, Validators.minLength(2)]),
    description: new FormControl("", [Validators.required, Validators.minLength(2)]),
    coDirecteur: new FormControl(""),
    formationDoctorale: new FormControl("", [Validators.required])
  })

  arrayRemove = (arr: Professeur[]) => {
    return arr.filter((ele) => {
      return ele.id !== this.currentProfesseur.id;
    });
  }

  ngOnInit(): void {
    this.getAllSujets()
    this.getAllProfesseurs()
    this.getAllFormationDoctorales()
  }

  closeResult: string = '';

  constructor(private modalService: NgbModal, private operationsService: OperationsService) { }


  fun = (content: any, s: Sujet) => {
    this.sujet2 = s
    this.form.setValue({
      titre: s.titre,
      description: s.description,
      coDirecteur: null,
      formationDoctorale: null
    });
    this.open(content)
  }
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
    
  }
  getAllFormationDoctorales() {
    
  }
  getAllProfesseurs() {
    
  }

  onClickSubmit() {
   
  }

  onClickDelete(s: Sujet) {
    
  }
  onClickUpdate() {
    
  }

}
