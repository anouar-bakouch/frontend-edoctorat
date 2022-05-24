import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/models/Postuler';
import { CandidastProfService } from '../../services/candidat-prof.service';
import { AlertData } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-prof-candidat',
  templateUrl: './prof-candidat.component.html',
  styleUrls: ['./prof-candidat.component.css']
})

export class ProfCandidatComponent implements OnInit {

  public candidats_ : Postuler [] = [];
  public alert: AlertData | undefined = undefined;
  public loading:boolean = false;
  public pathFileExists:boolean = false;

  constructor(public candidatS : CandidastProfService) { }

  ngOnInit(): void {
    this.candidatS.getCandidats()
    .then(x=>{
      this.loading = true;
      this.candidats_ = x.results;
      this.alert = {
        type: 'success',
        message: 'success',
      };
    
    })
    .catch(error=>{
      this.alert = {
        type: 'error',
        message: 'error',
      };
    }).finally(() => {
      this.loading = false
      setTimeout(() => (this.alert = undefined), 3000);
    });
  }

}
