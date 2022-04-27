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
  public labo:string = '';
  public formationDotorale:string = '';
  public sujet:string = '';

  constructor(public candidatPostuler : CandidatPostulerService) { }

  ngOnInit(): void {
    this.getPublishedSujets();
  }

  getPublishedSujets(){
     this.candidatPostuler.getPublishedSubjects().then(res=>{
       this.sujets = res.results;
       
     })
  }

  searchLabo(){
    if(this.labo === ''){
      this.ngOnInit();
    }
    else {
      this.sujets = this.sujets.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.labo.toLocaleLowerCase());
      })
    }
  }

  searchFormation(){
    if(this.formationDotorale === ''){
      this.ngOnInit();
    }
    else {
      this.sujets = this.sujets.filter(res=>{
        return res.formationDoctorale.titre.toLocaleLowerCase().match(this.formationDotorale.toLocaleLowerCase());
      })
    }
  }

  searchSujet(){
    if(this.sujet === ''){
      this.ngOnInit();
    }
    else {
      this.sujets = this.sujets.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.sujet.toLocaleLowerCase());
      })
    }
  }

}
