import { Component, OnInit } from '@angular/core';
import { Sujet } from 'src/app/models/Sujet';
import { CandidatPostulerService } from '../../services/candidat-postuler.service';

@Component({
  selector: '[app-choisir-sujets]',
  templateUrl: './choisir-sujets.component.html',
  styleUrls: ['./choisir-sujets.component.css']
})

export class ChoisirSujetsComponent implements OnInit {

 
  public sujets:Sujet[] = [];


  constructor(public candidatPostuler : CandidatPostulerService) { }

  ngOnInit(): void {
    this.getPublishedSujets();
  }

  getPublishedSujets(){
     this.candidatPostuler.getPublishedSubjects().then(res=>{
       this.sujets = res.results;
     })
  }

}
