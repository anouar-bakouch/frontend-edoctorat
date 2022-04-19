import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/models/Candidat';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: '[app-side-compte]',
  templateUrl: './side-compte.component.html',
  styleUrls: ['./side-compte.component.css']
})
export class SideCompteComponent implements OnInit {

  public candidatInfo !: Candidat;

  constructor(private router:Router,public candidatService:CandidatService) { }

  ngOnInit(): void {

    this.candidatService.getCandidatInfo().then(res=>{

    this.candidatInfo = res;

    })
  }


  // i have to add the code for in case there is an update in an other component


}
