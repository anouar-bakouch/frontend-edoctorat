import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Inscription } from 'src/app/models/Inscription';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-prof-inscrits',
  templateUrl: './prof-inscrits.component.html',
  styleUrls: ['./prof-inscrits.component.css']
})


export class ProfInscritsComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading: boolean = false;
  public message: string =
    "aucun sujet n'est choisi pour le moment,les sujets choisies vont apparaitre ici";
  public inscriptions: Inscription[] = [];
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
  public resultat: Result<Inscription> = {
    count: 0,
    next: '',
    previous: '',
    results: []
  }

  public form = new FormGroup({
    titre: new FormControl("", [Validators.required, Validators.minLength(2)]),
  })


  ngOnInit(): void {
    this.getMesInscrits()
  }

  closeResult: string = '';

  constructor(private modalService: NgbModal, private operationsService: OperationsService) { }

  fun = (content: any, s: Sujet) => {
    this.operationsService.getSujet(s.id).subscribe(data => {
      // console.log(data)
      this.sujet = data
    })

    this.form.setValue({
      titre: s.titre,
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

  getMesInscrits() {
    this.operationsService.getMesInscrits().subscribe(data => {
      console.log(data)
      this.resultat = data;
      this.inscriptions = this.resultat.results
    })
  }

  onClickSubmit() {
    
    this.loading = true;
    this.alert = {
      type: 'loading',
      message: 'loading',
    };

    const sujet = {
      formationDoctoraleId: this.sujet.formationDoctorale,
      titre: this.sujet.titre,
      description: this.sujet.description,
    };
    if (this.sujet.coDirecteur !== null) {
      sujet['coDirecteurId'] = this.sujet.coDirecteur;
    }
    this.operationsService
      .updateSujet(sujet, this.sujet.id)
      .then((data) => {
        this.loading = false;

        // for (var i = 0; i < this.sujets.length; i++) {
        //   if (this.sujets[i].id === this.sujet.id) {
        //     this.sujets[i] = data as Sujet;
        //   }
        // }
        this.alert = {
          type: 'success',
          message: 'modifier avec succès',
        };
      })
      .catch((err) => {
        console.log(err);
        this.alert = {
          type: 'faild',
          message: 'error lors de la modification',
        };
      })
      .finally(() => {
        this.form.reset();
        setTimeout(() => (this.alert = undefined), 3000);
      });
  }
}
