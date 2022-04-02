import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: '[app-bac]',
  templateUrl: './bac.component.html',
  styleUrls: ['./bac.component.css']
})
export class BacComponent implements OnInit {

 
  constructor(private httpCountries:CountriesService,private fservice:FormBuilder) { }

  private countries:any;
  public _cities:Array<string> = [];

  private selectedCountry!:string;

  public candidatBacForm = this.fservice.group({


    titre : [''],
    date_obtention : [''],
    pays : [''],
    ville : [''],
    province : [''],
    mention : [''],
    lycee:[''],
    bac_diplome : [''],
    releves :['']

  })

  ngOnInit(): void {

  
   this.httpCountries.getCountries().
   subscribe(
     res=>{
      this.countries = res.data;
     }
   )
  }

  getCities(){

       const index = this._countries.findIndex((object:any) => {
        return object.country === this.candidatBacForm.get('pays')?.value;
      });

       this._cities = this._countries[index].cities;
  
    }



get _countries(){
   
  return this.countries;
}
 

}
