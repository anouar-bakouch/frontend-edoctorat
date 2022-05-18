import { Component, OnInit } from '@angular/core';
import { LaboSujet } from '../../services/labo-sujet.service';


@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {

  constructor(public candidatLabo : LaboSujet ) { }

  ngOnInit(): void {
  }

  // public getCandidats(){
  //    const id = 0;
  //   this.candidatLabo.fetchCandidat(id)
  //   .then()
  //   .catch()
  //   .finally()
  // }

  

}
