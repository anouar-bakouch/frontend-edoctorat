import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import { Sujet } from 'src/app/models/Sujet';
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
  public prof: Professeur = {
    id: 0,
    telProfesseur: '',
    pathPhoto: '',
    user: 0,
    etablissement: 0,
    labo: 0,
    numSOM: 0,
    cin: '',
    grade: '',
    nombreEncadrer: 0,
    nombreProposer: 0,
    nomComplet: '',
    sujets: []
  }
  public coDirecteur: Professeur = {
    id: 0,
    telProfesseur: '',
    pathPhoto: '',
    user: 0,
    etablissement: 0,
    labo: 0,
    numSOM: 0,
    cin: '-------',
    grade: '',
    nombreEncadrer: 0,
    nombreProposer: 0,
    nomComplet: '',
    sujets: []
  }
  public currentProfesseur: Professeur = {
    id: 0,
    telProfesseur: '',
    pathPhoto: '',
    user: 0,
    etablissement: 0,
    labo: 0,
    numSOM: 0,
    cin: '',
    grade: '',
    nombreEncadrer: 0,
    nombreProposer: 0,
    nomComplet: '',
    sujets: []
  }
  public sujet: Sujet = {
    id: 0,
    professeur: {
      id: 0,
      telProfesseur: '',
      pathPhoto: '',
      user: 0,
      etablissement: 0,
      labo: 0,
      numSOM: 0,
      cin: '',
      grade: '',
      nombreEncadrer: 0,
      nombreProposer: 0,
      nomComplet: '',
      sujets: []
    },
    coDirecteur: {
      id: 0,
      telProfesseur: '',
      pathPhoto: '',
      user: 0,
      etablissement: 0,
      labo: 0,
      numSOM: 0,
      cin: '',
      grade: '',
      nombreEncadrer: 0,
      nombreProposer: 0,
      nomComplet: '',
      sujets: []
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
    this.getAllFormationDoctorales()
    this.getAllProfesseurs()
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
      // console.log(data);
      // this.sujets = data.sujets;
      this.sujets = data;
      // console.log(this.prof)
      //this.sujets = this.prof.sujets
      // this.prof.sujets.forEach(element => {
      //   //console.log(element.formationDoctorale) 
      //     this.operationsService.getformDoct(element.formationDoctorale).subscribe(data=>{
      //     //console.log(data)
      //     element.formationDoctorale = data
      //   })
      //   console.log(element.coDirecteur)
      //   if (element.coDirecteur!=null){this.operationsService.getProfesseur(element.coDirecteur).subscribe(data => {
      //     // console.log(data)
      //     element.coDirecteur = data
      //   })}
      //   element.coDirecteur = this.coDirecteur

      // });

    })
  }
  getAllFormationDoctorales() {
    this.operationsService.getFormationDoctorales().subscribe(data => {
      // console.log(data);
      // this.sujets = data.sujets;
      this.formationDoctorales = data;
      //console.log(this.sujets)
    })
  }
  getAllProfesseurs() {
    this.operationsService.getProfesseurs().subscribe(data => {
      //console.log(data);
      // this.sujets = data.sujets;
      this.professeurs = data;
      //console.log(this.sujets)
    })
  }

  onClickSubmit() {
    console.log('success')
    this.operationsService.getProfesseur(this.form.get('coDirecteur')?.value).subscribe(data => {
      this.coDirecteur = data;
    })
    this.operationsService.getformDoct(this.form.get('formationDoctorale')?.value).subscribe(data => {
      this.formationDoctorale = data;
    })
    this.sujet = this.form.value
    // this.sujet.coDirecteur = this.coDirecteur
    // this.sujet.professeur = this.currentProfesseur
    // this.sujet.formationDoctorale = this.formationDoctorale
    console.log(this.sujet);

    this.operationsService.addSujet(this.sujet).subscribe((data) => {
      console.log(data)
    },
      (err) => {
        console.log(err)
      })
  }

  onClickDelete(s: Sujet) {
    console.log(s.id)
    this.operationsService.deleteSujet(this.sujet).subscribe((data) => {
      console.log(data)
    },
      (err) => {
        console.log(err)
      })
  }
  onClickUpdate(s: Sujet) {
    console.log(s.id)
    this.operationsService.updateSujet(this.sujet).subscribe((data) => {
      console.log(data)
    },
      (err) => {
        console.log(err)
      })
  }
}
