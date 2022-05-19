import { Component, OnInit } from '@angular/core';
import { Examiner } from 'src/app/models/Examiner';
import Result from 'src/app/models/Result';
import { LaboSujet } from '../../services/labo-sujet.service';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})

export class ResultatsComponent implements OnInit {

  public candidatInfos : Result<Examiner> | undefined;
  constructor(public candidatLabo : LaboSujet ) { }

  ngOnInit(): void {
    this.fetchResultats();
  }
  
  public fetchResultats(){

    this.candidatLabo.fetchResultats()
    .then(res=>{
      
          this.candidatInfos = res;
        
    })
    .catch()
    .finally()

  }


}
