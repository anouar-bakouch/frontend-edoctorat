import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Diplome } from 'src/app/models/Diplome';
import   Result from 'src/app/models/Result';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CountriesService } from '../../services/countries.service';
import { DiplomeType} from 'src/app/enums/DiplomeType';
import { CandidatService } from '../../services/candidat.service';
import { Annexe } from 'src/app/models/Annexe';
import {
  even,
  RxFormBuilder,
  RxFormGroup,
} from '@rxweb/reactive-form-validators';

@Component({
  selector: '[app-dut]',
  templateUrl: './dut.component.html',
  styleUrls: ['./dut.component.css']
})

export class DutComponent implements OnInit {
  result!: Result<Diplome>;

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

  public mentions = this.candidatService.mentions;
  public bacTypes = this.candidatService.TypeBac;


  //remember that type will always be bac in this case so in case of post 

  isUpdating = false;
  permitUpdate = true;
  errorText: string | undefined;
  isFetchingInfo = true;
  public selectedFile: File | undefined;



  public candidatDutForm = <RxFormGroup> this.fservice.group({


    intitule: [DiplomeType.DUT],
    type: [DiplomeType.DUT, Validators.required],
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

    this.candidatDutForm.get('intitule')?.disable();
    this.candidatDutForm.get('type')?.disable();
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
      this.candidatDutForm.disable();
      this.candidatDutForm.get('intitule')?.setValue(this.candidatBac?.intitule);
      this.candidatDutForm.get('type')?.setValue(this.candidatBac?.type);
      this.candidatDutForm.get('mention')?.setValue(this.candidatBac?.mention);
      this.candidatDutForm.get('moyen_generale')?.setValue(this.candidatBac?.moyen_generale);
      this.candidatDutForm.get('pays')?.setValue(this.candidatBac?.pays);
      this.candidatDutForm.get('dateCommission')?.setValue(this.candidatBac?.dateCommission);
      this.candidatDutForm.get('etablissement')?.setValue(this.candidatBac?.etablissement);
      this.candidatDutForm.get('specialite')?.setValue(this.candidatBac?.specialite);
      this.candidatDutForm.get('province')?.setValue(this.candidatBac?.province);
      this.candidatDutForm.get('ville')?.setValue(this.candidatBac?.ville);
         
      const annexe:Annexe | undefined =  this.candidatBac?.annexe;

      console.log(this.candidatBac?.annexe);

      }

      else {
        this.message = 'vous pouvez continuer a modifier votre parcours'
        this.BacExist = false;
      }

          
      })
    
    

  }


  get _countries() {

    return this.countries;
  }

  enableUpdate(){
    this.candidatDutForm.enable();
    this.candidatDutForm.get('intitule')?.disable();
    this.candidatDutForm.get('type')?.disable();
  }

  addBac(){
    this.errorText = undefined;
    this.isUpdating = true;

    let formdata = this.candidatDutForm.toFormData();
  
    this.candidatParcours.addDiplome(formdata).then(res=>{

      console.log(res);

    }).catch((err) => {
      this.errorText =
        "Une erreur s'est produite lors de la mise à jour. Revérifiez vos données ou réessayez plus tard.";
      console.log(err);
    }).finally(() => (this.isUpdating = false));
  

  }

  public onFileSelected(event: any) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 1000000) {
        this.errorText =
          'La taille du fichier ne peut pas être supérieure à 1 Mo.';
        this.permitUpdate = false;
      } else {
        this.errorText = undefined;
        this.permitUpdate = true;
        this.selectedFile = file;
      }
    }
  }

 

   
}



