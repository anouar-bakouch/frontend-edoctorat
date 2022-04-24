import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Diplome } from 'src/app/models/Diplome';
import Result from 'src/app/models/Result';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CountriesService } from '../../services/countries.service';
import {DiplomeType} from 'src/app/enums/DiplomeType';

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
  public candidatBac : Diplome | undefined;
  public message !: string;
  public BacExist:boolean = false;
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

      const index = this.result.results.findIndex((object: any) => {
        return object.type === DiplomeType.BAC;
      });

      if(index !== -1) {
      this.candidatBac = this.result.results[index];
      this.BacExist = true;
      this.candidatBacForm.disable();
      }

      else {
        this.message = 'vous pouvez continuer a modifier votre parcours'
        this.BacExist = false;
      }

          
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
