import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidat } from 'src/app/models/Candidat';
import { Commission } from 'src/app/models/Commission';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-preselection',
  templateUrl: './preselection.component.html',
  styleUrls: ['./preselection.component.css']
})
export class PreselectionComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading: boolean = false;
  public page: number = 1;
  public itemsCount: number | undefined;
  public commissions: Commission[] = [];
  public sujets: Sujet[] = [];
  public candidatsSujet: {
    examiner_id: number,
    candidat: Candidat,
    valider: boolean
  }[]
  // public candidatsSujet:[]=[]
  closeResult: string = '';
  selectedCandidatsIds: number[] = [];
  selectedCandidats: {
    examiner_id: number,
    candidat: Candidat,
    valider: boolean
  }[] = [];
  candidats: Candidat[] = [];

  public result: Result<any> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };



  constructor(private modalService: NgbModal, private operationsService: OperationsService) { }

  ngOnInit(): void {
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };

    Promise.all([this.getCommissions()]).then(() => {
      this.alert = {
        type: 'success',
        message: 'success',
      };
    }).catch((error) => {
      console.log(error)
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }

  onClickSujet(content: any, s: Sujet) {
    this.selectedCandidats = []
    this.candidatsSujet = []
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.getCandidatsSujet(s.id).then(() => {
      this.alert = {
        type: 'success',
        message: 'success',
      };
      this.open(content)
    }).catch((error) => {
      // console.log(error)
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' }).result.then((result) => {
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


  getCandidatsSujet(id: number) {
    return new Promise((resolve, reject) => {
      this.operationsService.getCandidatsSujet(id).then(data => {
        this.candidatsSujet = data['data'] as {
          examiner_id: number,
          candidat: Candidat,
          valider: boolean
        }[]
        for (var i = 0; i < this.candidatsSujet.length; i++) {
          if (this.candidatsSujet[i]['valider'] === true) {
            this.selectedCandidats.push(this.candidatsSujet[i])
          }
        }
        console.log(this.candidatsSujet)
        console.log(this.selectedCandidats)
        resolve(data);
      }).catch((err) => {
        reject(err)
      })
    })
  }


  getCommissions = () => {
    return new Promise((resolve, reject) => {
      this.operationsService.getCommissions().then(data => {
        this.loading = false
        this.result = data as Result<Commission>;
        this.commissions = this.result.results;
        this.itemsCount = data.count;
        resolve(data);
      }).catch((err) => {
        reject(err)
      })
    })
  }


  onIndexChange(offset: number) {
    if (this.loading) return;
    this.loading = true;
    this.operationsService
      .getCommissions(offset)
      .then((d) => {
        this.commissions = d.results;
      })
      .finally(() => (this.loading = false));
  }

  onCandidatSelect(item: any) {
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    const valider = {
      valider: !item.valider
    }
    this.operationsService.validerCandidat(item.examiner_id, valider).then((data) => {
      item.valider = !item.valider
      this.selectedCandidats.push(item)
      for (var i = 0; i < this.candidatsSujet.length; i++) {
        if (this.candidatsSujet[i] === item) {
          this.candidatsSujet.splice(i, 1);
        }
      }

      console.log(data)
      console.log(this.candidatsSujet)
      console.log(this.selectedCandidats)

      this.alert = {
        type: 'success',
        message: 'success',
      };

    }).catch((error) => {
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 3000);
    });

  }


  onCandidatDeSelect(item: any) {
    // this.candidatsSujet.push(item)
    for (var i = 0; i < this.selectedCandidats.length; i++) {
      if (this.selectedCandidats[i] === item) {
        this.selectedCandidats.splice(i, 1);
      }
    }
  }

}
