import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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


  public candidatBacForm = this.fservice.group({

    intitule :['baccalauréat'] , 
    type : ['',Validators.required],
    dateCommission : ['',Validators.required],
    pays : ['',Validators.required],
    ville : ['',Validators.required],
    province : ['',Validators.required],
    mention : ['',Validators.required],
    etablissement :['',Validators.required],
    specialite : ['',Validators.required],
    moyen_generale : ['',Validators.required],
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

   this.candidatBacForm.get('intitule')?.disable();

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
