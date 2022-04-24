import { Component, OnInit } from '@angular/core';
import { Commission } from 'src/app/models/Commission';
import { Participe } from 'src/app/models/Participe';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: '[app-prof-commission]',
  templateUrl: './prof-commission.component.html',
  styleUrls: ['./prof-commission.component.css']
})
export class ProfCommissionComponent implements OnInit {
  public participes: Participe[] = [];
  public commissions: Commission[] = [];
  public commission: Commission = {
    id: 0,
    dateCommission: '',
    heure: '',
    valider: false,
    lieu: '',
    labo: 0,
    professeurs: []
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
    this.getAllParticipes()
  }

  getAllParticipes() {
    this.operationsService.getParticipes().subscribe(data => {
      this.result = data;
      this.participes = this.result.results;
      this.currentProfesseur.id = this.participes[0].professeur
      this.participes.forEach(p => {
        this.getCommission(p.commission.id)
      });
      console.log(this.commissions)
    })
  }

  getCommission(id: number){
    this.operationsService.getCommission(id).subscribe(data => {
      this.commission = data;
      for (var i = 0; i < this.commission.professeurs.length; i++) {

        if (this.commission.professeurs[i].id === this.currentProfesseur.id) {

          this.commission.professeurs.splice(i, 1);
        }

      }
      this.commissions.push(this.commission)
    })
  }
}
