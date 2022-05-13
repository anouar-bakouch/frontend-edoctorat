import { Component, OnInit } from '@angular/core';
import { Commission } from 'src/app/models/Commission';
import { Participe } from 'src/app/models/Participe';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: '[app-prof-commission]',
  templateUrl: './prof-commission.component.html',
  styleUrls: ['./prof-commission.component.css']
})
export class ProfCommissionComponent implements OnInit {
  public alert: AlertData | undefined = undefined;
  public loading: boolean = false;
  public participes: Participe[] = [];
  public commissions: Commission[] = [];
  public commission: Commission = {
    id: 0,
    dateCommission: '',
    heure: '',
    valider: false,
    lieu: '',
    labo: 0,
    participants: []
  }
  public result: Result<any> = {
    count: 0,
    next: null,
    previous: null,
    results: []
  }
  public currentProfesseur: Professeur = {
    id: 0,
    nom: '',
    prenom: ''
  }
  constructor(private operationsService: OperationsService) { }

  ngOnInit(): void {
    this.getCommissions()
  }

  getCommissions(){
    this.loading = true
    this.alert = {
      type: 'loading',
      message: 'loading',
    };
    this.operationsService.getCommissions().then(data => {
      this.loading = false
      console.log(data)
      this.result = data as Result<Commission>;
      this.commissions = this.result.results;
      // this.commissions = data;
      console.log(this.commissions)
      // for (var i = 0; i < this.commissions.participants.length; i++) {

      //   if (this.commissions.participants[i].id === this.currentProfesseur.id) {

      //     this.commissions.participants.splice(i, 1);
      //   }

      // }
      // this.commissions.push(this.commission)
    }).catch((error) => {
      console.log(error)
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      this.alert = {
        type: 'success',
        message: 'success',
      };
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }
}
