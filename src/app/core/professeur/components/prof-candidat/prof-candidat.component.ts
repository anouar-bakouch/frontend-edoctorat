import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/models/Postuler';
import Result from 'src/app/models/Result';
import { CandidastProfService } from '../../services/candidat-prof.service';


@Component({
  selector: 'app-prof-candidat',
  templateUrl: './prof-candidat.component.html',
  styleUrls: ['./prof-candidat.component.css']
})

export class ProfCandidatComponent implements OnInit {

  public candidats_ : Postuler [] = [];

  constructor(public candidatS : CandidastProfService) { }

  ngOnInit(): void {
    this.candidatS.getCandidats()
    .then(x=>{
      this.candidats_ = x.results;
   
    })
    .catch()
  }

}
