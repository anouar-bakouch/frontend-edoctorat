import { Component, OnInit } from '@angular/core';
import { LaboSujet } from '../../services/labo-sujet.service';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})

export class ResultatsComponent implements OnInit {

  constructor(public candidatLabo : LaboSujet ) { }

  ngOnInit(): void {
    this.fetchResultats();
  }
  
  public fetchResultats(){

    this.candidatLabo.fetchResultats()
    .then(res=>{
          console.log(res);
    })
    .catch()
    .finally()

  }


}
