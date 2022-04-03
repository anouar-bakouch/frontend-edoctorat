import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-c-ingenieur',
  templateUrl: './c-ingenieur.component.html',
  styleUrls: ['./c-ingenieur.component.css']
})
export class CIngenieurComponent implements OnInit{

  private countries:any;
  public _cities:Array<string> = [];
  constructor(private httpCountries:CountriesService,private fservice:FormBuilder) { }


  public candidatIngenieureForm = this.fservice.group({

  specialite : [''],
  titrefiliere : [''],
  dateIngenieur: [''],
  pays : [''],
  ville : [''],
  province : [''],
  mention: [''],
  Etablissement:[''],ingenieure_note:[''],ingenieure_diplome:[''],releves:[''],memoirepfe:['']
  


  })

  ngOnInit(): void {
    this.httpCountries.getCountries().
   subscribe(
     res=>{
      this.countries = res.data;
     }
   )
  }

  get _countries(){
   
    return this.countries;
  }

  getCities(){

    const index = this._countries.findIndex((object:any) => {
     return object.country === this.candidatIngenieureForm.get('pays')?.value;
   });

    this._cities = this._countries[index].cities;

 }

}

