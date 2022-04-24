import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Diplome } from 'src/app/models/Diplome';
import Result from 'src/app/models/Result';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: '[app-bac]',
  templateUrl: './bac.component.html',
  styleUrls: ['./bac.component.css']
})

export class BacComponent implements OnInit {

  constructor(
    private httpCountries: CountriesService,
    private fservice: FormBuilder,
    private candidatParcours : CandidatParcoursService
    ) { }

  private countries: any;
  public _cities: Array<string> = [];
  private candidatDiplome : Diplome [] = [];
  public result: Result<any> = {
    count: 0,
    next: null,
    previous: null,
    results: []
  }


  public candidatBacForm = this.fservice.group({

    intitule: ['baccalauréat'],
    type: ['', Validators.required],
    dateCommission: ['', Validators.required],
    pays: ['', Validators.required],
    ville: ['', Validators.required],
    province: ['', Validators.required],
    mention: ['', Validators.required],
    etablissement: ['', Validators.required],
    specialite: ['', Validators.required],
    moyen_generale: ['', Validators.required],
    bac_diplome: [''],
    releves: ['']

  })

  ngOnInit(): void {

    this.candidatBacForm.get('intitule')?.disable();
    this.httpCountries.getCountries().
      subscribe(
        res => {
          this.countries = res.data;
        }
      )


    this.candidatParcours.getDiplomes().then(res=>{
     
      this.result = res;

      console.log(res);

      console.log(this.result.results);

      
      
      })
    
    

  }

  getCities() {

    const index = this._countries.findIndex((object: any) => {
      return object.country === this.candidatBacForm.get('pays')?.value;
    });

    this._cities = this._countries[index].cities;

  }

  get _countries() {

    return this.countries;
  }




}
