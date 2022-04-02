import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-dut',
  templateUrl: './dut.component.html',
  styleUrls: ['./dut.component.css']
})


export class DutComponent implements OnInit {

  private countries:any;
  public _cities:Array<string> = [];
  constructor(private httpCountries:CountriesService,private fservice:FormBuilder) { }


  public candidatDutForm = this.fservice.group({

  specialite : [''],
  titreDut : [''],
  pays : [''],
  ville : [''],
  province : [''],
  


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
     return object.country === this.candidatDutForm.get('pays')?.value;
   });

    this._cities = this._countries[index].cities;

 }

}
