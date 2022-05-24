import { Component, OnInit } from '@angular/core';
import { CandidastProfService } from '../../services/candidat-prof.service';

@Component({
  selector: 'app-prof-candidat',
  templateUrl: './prof-candidat.component.html',
  styleUrls: ['./prof-candidat.component.css']
})

export class ProfCandidatComponent implements OnInit {

  constructor(public candidatS : CandidastProfService) { }

  ngOnInit(): void {
    this.candidatS.getCandidats()
    .then(x=>{
      console.log(x);
    })
    .catch()
  }

}
