import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';



@Component({
  selector: 'app-info-personnels',
  templateUrl: './info-personnels.component.html',
  styleUrls: ['./info-personnels.component.css']
})

export class InfoPersonnelsComponent implements OnInit {

  private countries:any;

  constructor(private httpCountries:CountriesService,private fservice:FormBuilder) { }

  ngOnInit(): void {
    this.httpCountries.getCountries().
    subscribe(
      res=>{
       this.countries = res.data;
      }
    )
   }


   public candidatInfoForm = this.fservice.group({

    prenomCandidat : [''],
    nomCandidat : [''],
    nomCandidatAr : [''],
    prenomCandidatAr : [''],
    cinCandidat : [''],
    cneCandidat : [''],
    adresse:[''],
    adresseAr:[''],
    pays : [''],
    sexe:[''],
    villeDeNaissance:[''],
    villeDeNaissanceAr:[''],
    ville:[''],
    dateDeNaissance:[''],
    typeDeHandiCape:[''],
    academie:[''],
    mailCandidat:[''],
    telCandidat:[''],
    pathPhoto:[''],
    situation_familiale:['']

  })
 
 
 get _countries(){
    
   return this.countries;
 }

}
