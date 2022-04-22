import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import UserProf from 'src/app/models/UserProf';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: '[app-prof-sujet]',
  templateUrl: './prof-sujet.component.html',
  styleUrls: ['./prof-sujet.component.css']
})

export class ProfSujetComponent implements OnInit {
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
  public result:Result<any> = {
    count: 0,
    next: null,
    previous: null,
    results: []
  }

  public form = new FormGroup({
    titre: new FormControl(""),
    description: new FormControl(""),
    coDirecteur: new FormControl(""),
    formationDoctorale: new FormControl("")
  })

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
    this.getAllProfesseurs()
    this.getAllFormationDoctorales()
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
      console.log(data)

      this.result = data;
      this.sujets = this.result.results;

    })
  }
  getAllFormationDoctorales() {
    this.operationsService.getFormationDoctorales().subscribe(data => {
      console.log(data)
      this.result = data;
      this.formationDoctorales = this.result.results;
    })
  }
  getAllProfesseurs() {
    this.operationsService.getProfesseurs().subscribe(data => {
      //console.log(data)
      this.result = data;
      console.log(this.result.results)
      this.professeurs = this.result.results;
      // console.log(this.professeurs)
    })
  }

  onClickSubmit() {
    this.sujet = this.form.value
    const sujet: JSON = <JSON><unknown>{
      "coDirecteurId": this.sujet.coDirecteur,
      "formationDoctoraleId": this.sujet.formationDoctorale,
      "titre": this.sujet.titre,
      "description": this.sujet.description
    }
    // console.log(sujet);
    this.operationsService.addSujet(sujet).subscribe((data) => {
      console.log(data)
    },
      (err) => {
        console.log(err)
      })
  }

  onClickDelete(s: Sujet) {
    // console.log(s.id)
    this.operationsService.deleteSujet(s).subscribe((data) => {
      console.log(data)
    },
      (err) => {
        console.log(err)
      })
  }
  onClickUpdate(s: Sujet) {
    // console.log(s.id)
    this.operationsService.updateSujet(s).subscribe((data) => {
      console.log(data)
    },
      (err) => {
        console.log(err)
      })
  }
}
