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
  selector: '[app-licence]',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.css']
})

export class CIngenieurComponent implements OnInit {

  result!: Result<Diplome>;

  constructor(
    private httpCountries: CountriesService,
    private fservice: FormBuilder,
    private candidatParcours : CandidatParcoursService,
    private candidatService : CandidatService
    ) { }


  private countries: any;
  public _cities: Array<string> = [];
  public candidatCI : Diplome | undefined;
  public message !: string;
  public CIExist:boolean = false;

  public mentions = this.candidatService.mentions;
  public TypesCI = this.candidatService.TypesCI;


  //remember that type will always be bac in this case so in case of post 

  isUpdating = false;
  permitUpdate = true;
  errorText: string | undefined;
  isFetchingInfo = true;
  public selectedFile: File | undefined;


  public candidatCIForm = <RxFormGroup> this.fservice.group({

    intitule: [DiplomeType.CI],
    type: [DiplomeType.CI, Validators.required],
    dateCommission: ['', Validators.required],
    pays: ['', Validators.required],
    ville: ['', Validators.required],
    province: ['', Validators.required],
    mention: ['', Validators.required],
    etablissement: ['', Validators.required],
    specialite: ['', Validators.required],
    moyen_generale: ['', Validators.required],
    ci_diplome : [''],
    releves_ci: ['']

  })

  ngOnInit(): void {

    this.candidatCIForm.get('intitule')?.disable();
    this.candidatCIForm.get('type')?.disable();
    this.httpCountries.getCountries().
      subscribe(
        res => {
          this.countries = res.data;
        }
      )

    this.getCIInfo();
    

  }

  getCIInfo(){
    this.candidatParcours.getDiplomes().then(res=>{
     
      console.log(res);
      this.isFetchingInfo = false;
      this.result = res;

      const index = this.result.results.findIndex((object: any) => {
        return object.intitule === DiplomeType.CI; // temporarly
      });

      if(index !== -1) {
      
      this.candidatCI = this.result.results[index];
      this.CIExist = true;
      this.candidatCIForm.disable();
      this.candidatCIForm.get('intitule')?.setValue(this.candidatCI?.intitule);
      this.candidatCIForm.get('type')?.setValue(this.candidatCI?.type);
      this.candidatCIForm.get('mention')?.setValue(this.candidatCI?.mention);
      this.candidatCIForm.get('moyen_generale')?.setValue(this.candidatCI?.moyen_generale);
      this.candidatCIForm.get('pays')?.setValue(this.candidatCI?.pays);
      this.candidatCIForm.get('dateCommission')?.setValue(this.candidatCI?.dateCommission);
      this.candidatCIForm.get('etablissement')?.setValue(this.candidatCI?.etablissement);
      this.candidatCIForm.get('specialite')?.setValue(this.candidatCI?.specialite);
      this.candidatCIForm.get('province')?.setValue(this.candidatCI?.province);
      this.candidatCIForm.get('ville')?.setValue(this.candidatCI?.ville);
         
      const annexe:Annexe | undefined =  this.candidatCI?.annexe;

      console.log(this.candidatCI?.annexe);

      }

      else {
        this.message = 'vous pouvez continuer a modifier votre parcours'
        this.CIExist = false;
      }

          
      })
  }

  get _countries() {

    return this.countries;
  }

  enableUpdate(){
    this.candidatCIForm.enable();
    this.candidatCIForm.get('intitule')?.disable();
    this.candidatCIForm.get('type')?.disable();
  }

  addBac(){
    this.errorText = undefined;
    this.isUpdating = true;

    let formdata = this.candidatCIForm.toFormData();
  
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



