import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    coDirecteur: new FormControl(null),
    formationDoctorale: new FormControl("", [Validators.required])
  })

  arrayRemove = (arr: Professeur[]) => {
    console.log(this.currentProfesseur)
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
    this.operationsService.getSujets().subscribe(data => {
      this.result = data;
      this.sujets = this.result.results;
      // this.currentProfesseur = this.sujets[1].professeur
      console.log(this.sujets)
    })
  }
  getAllFormationDoctorales() {
    this.operationsService.getFormationDoctorales().subscribe(data => {
      this.result = data;
      this.formationDoctorales = this.result.results;
    })
  }
  getAllProfesseurs() {
    this.operationsService.getProfesseurs().subscribe(data => {
      this.result = data;
      this.professeurs = this.result.results;
      console.log(this.professeurs)
      var result = this.arrayRemove(this.professeurs);
      this.professeurs = result
    })
  }

  onClickSubmit() {
    this.sujet = this.form.value
    if (this.sujet.coDirecteur === null) {
      // console.log('hii')
      const sujet: JSON = <JSON><unknown>{
        // "coDirecteurId": this.sujet.coDirecteur,
        "formationDoctoraleId": this.sujet.formationDoctorale,
        "titre": this.sujet.titre,
        "description": this.sujet.description
      }
      this.operationsService.addSujet(sujet).subscribe((data) => {
        this.sujets.push(this.sujet)
      },
        (err) => {
          console.log(err)
        }, () => {
          this.form.reset()
        })
    } else {
      const sujet: JSON = <JSON><unknown>{
        "coDirecteurId": this.sujet.coDirecteur,
        "formationDoctoraleId": this.sujet.formationDoctorale,
        "titre": this.sujet.titre,
        "description": this.sujet.description
      }
      this.operationsService.addSujet(sujet).subscribe((data) => {
        this.sujets.push(this.sujet)
      },
        (err) => {
          console.log(err)
        }, () => {
          this.form.reset()
        })
    }
  }

  onClickDelete(s: Sujet) {
    this.operationsService.deleteSujet(s).subscribe((data) => {

      for (var i = 0; i < this.sujets.length; i++) {

        if (this.sujets[i].id === s.id) {

          this.sujets.splice(i, 1);
        }

      }
    },
      (err) => {
        console.log(err)
      })
  }
  onClickUpdate() {
    this.sujet = this.form.value
    if (this.sujet.coDirecteur === null) {
      const sujet: JSON = <JSON><unknown>{
        "formationDoctoraleId": this.sujet.formationDoctorale,
        "titre": this.sujet.titre,
        "description": this.sujet.description
      }
      this.operationsService.updateSujet(sujet, this.sujet2.id).subscribe((data) => {
        for (var i = 0; i < this.sujets.length; i++) {

          if (this.sujets[i].id === this.sujet2.id) {

            this.sujets[i] = this.sujet;
          }

        }
      },
        (err) => {
          console.log(err)
        }, () => {
          this.form.reset()
        })
    } else {
      const sujet: JSON = <JSON><unknown>{
        "coDirecteurId": this.sujet.coDirecteur,
        "formationDoctoraleId": this.sujet.formationDoctorale,
        "titre": this.sujet.titre,
        "description": this.sujet.description
      }
      console.log(sujet)
      this.operationsService.updateSujet(sujet, this.sujet2.id).subscribe((data) => {
        for (var i = 0; i < this.sujets.length; i++) {

          if (this.sujets[i].id === this.sujet2.id) {

            this.sujets[i] = this.sujet;
          }

        }
      },
        (err) => {
          console.log(err)
        }, () => {
          this.form.reset()
        })
    }
  }
}
