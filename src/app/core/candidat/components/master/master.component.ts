import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  private countries:any;
  public _cities:Array<string> = [];
  constructor(private httpCountries:CountriesService,private fservice:FormBuilder) { }


  public candidatMasterForm = this.fservice.group({

  type: [''],
  specialite : [''],
  titrefiliere : [''],
  dateMatser: [''],
  pays : [''],
  ville : [''],
  province : [''],
  mention: [''],
  Etablissement:[''],master_note:[''],master_diplome:[''],releves:[''],
  


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
     return object.country === this.candidatMasterForm.get('pays')?.value;
   });

    this._cities = this._countries[index].cities;

 }

}