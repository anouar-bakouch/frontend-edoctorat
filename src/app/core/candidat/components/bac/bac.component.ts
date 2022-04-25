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

  isUpdating = false;
  permitUpdate = true;
  errorText: string | undefined;
  isFetchingInfo = true;
  public selectedFile: File | undefined;
  public annexe = {
    typeAnnexe : '',
    titre: '',
    pathFile: ''
  }
  public bac:Diplome = {
    idDiplome: 0,
    intitule: '',
    type: '',
    dateCommission: '',
    mention: '',
    pays: '',
    etablissement: '',
    specialite: '',
    ville: '',
    province: '',
    moyen_generale: 0,
    annexe: this.annexe
  }


  public candidatBacForm = <RxFormGroup> this.fservice.group({


    intitule: ['baccalauréat'],
    type: ['baccalauréat', Validators.required],
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
    this.candidatBacForm.enable();
    this.candidatBacForm.get('intitule')?.disable();
    this.candidatBacForm.get('type')?.disable();
  }

  addBac(){
    this.errorText = undefined;
    this.isUpdating = true;
    let formdata = this.candidatBacForm.toFormData();

    

    
   
    this.candidatParcours.addDiplome(this.candidatBacForm).then(res=>{

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



