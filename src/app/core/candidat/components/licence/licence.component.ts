import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.css']
})
export class LicenceComponent implements OnInit {

  private countries:any;
  public _cities:Array<string> = [];
  constructor(private httpCountries:CountriesService,private fservice:FormBuilder) { }


  public candidatLicenceForm = this.fservice.group({

  specialite : [''],
  titrefiliere : [''],
  dateLicence: [''],
  pays : [''],
  ville : [''],
  province : [''],
  mention: [''],
  Etablissement:[''],licence_note:[''],licence_diplome:[''],releves:[''],
  


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
     return object.country === this.candidatLicenceForm.get('pays')?.value;
   });

    this._cities = this._countries[index].cities;

 }

}