import { Component, OnInit } from '@angular/core';
import Config from 'src/app/models/Config';
import { Sujet } from 'src/app/models/Sujet';
import { CandidatPostulerService } from '../../services/candidat-postuler.service';
import { CandidatService } from '../../services/candidat.service';

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
  public page:number = 1;
  public config!:Config;

  constructor(public candidatPostuler : CandidatPostulerService,public candidatConfig:CandidatService) { }

  ngOnInit(): void {
    this.getPublishedSujets();
  }

  getPublishedSujets(){
     this.candidatPostuler.getPublishedSubjects().then(res=>{
       this.sujets = res.results;
     })
  }

  getConfigInfo(){
    this.candidatConfig.getConfigInfo().then(res=>{
      this.config = res;
      console.log(this.config)
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
