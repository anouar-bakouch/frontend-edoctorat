import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Diplome } from 'src/app/models/Diplome';
import Result from 'src/app/models/Result';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CountriesService } from '../../services/countries.service';
import {DiplomeType} from 'src/app/enums/DiplomeType';
import { MentionEnum } from 'src/app/enums/MentionEnum';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: '[app-bac]',
  templateUrl: './bac.component.html',
  styleUrls: ['./bac.component.css']
})

export class BacComponent implements OnInit {

  constructor(
    private httpCountries: CountriesService,
    private fservice: FormBuilder,
    private candidatParcours : CandidatParcoursService,
    private candidatService : CandidatService
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

  public mentions = this.candidatService.mentions;
  public bacTypes = this.candidatService.TypeBac;


  //remember that type will always be bac in this case so in case of post 

  public candidatBacForm = this.fservice.group({

    intitule: ['baccalauréat'],
    type: ['baccalauréat', Validators.required],
    dateCommission: ['', Validators.required],
    pays: ['', Validators.required],
    ville: [0, Validators.required],
    province: ['', Validators.required],
    mention: [0, Validators.required],
    etablissement: ['', Validators.required],
    specialite: ['', Validators.required],
    moyen_generale: ['', Validators.required],
    bac_diplome: [''],
    releves: ['']

  })

  ngOnInit(): void {

    this.candidatBacForm.get('intitule')?.disable();
    this.candidatBacForm.get('type')?.disable();

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
      this.candidatBacForm.get('intitule')?.setValue(this.candidatBac?.intitule);
      this.candidatBacForm.get('type')?.setValue(this.candidatBac?.type);
      this.candidatBacForm.get('mention')?.setValue(this.candidatBac?.mention);
      this.candidatBacForm.get('moyen_generale')?.setValue(this.candidatBac?.moyen_generale);
      this.candidatBacForm.get('pays')?.setValue(this.candidatBac?.pays);
      this.candidatBacForm.get('dateCommission')?.setValue(this.candidatBac?.dateCommission);
      this.candidatBacForm.get('etablissement')?.setValue(this.candidatBac?.etablissement);
      this.candidatBacForm.get('specialite')?.setValue(this.candidatBac?.specialite);
      this.candidatBacForm.get('province')?.setValue(this.candidatBac?.province);
      this.candidatBacForm.get('ville')?.setValue(this.candidatBac?.ville);
      
      

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

  enableUpdate(){
    this.candidatBacForm.enable();
    this.candidatBacForm.get('intitule')?.disable();
    this.candidatBacForm.get('type')?.disable();
  }

   public Checkmention(mention:number){

   if (mention >= 12 && mention < 14){
     return MentionEnum.AB
   }

   if (mention >= 14 && mention < 16){
    return MentionEnum.B
  }

  if (mention >= 16 && mention < 18){
    return MentionEnum.TB
  }

  if (mention >= 18 && mention < 20){
    return MentionEnum.E
  }

   return MentionEnum.P

   }

   
}



