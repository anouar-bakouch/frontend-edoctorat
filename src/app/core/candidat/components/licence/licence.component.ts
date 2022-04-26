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

export class LicenceComponent implements OnInit {

  result!: Result<Diplome>;

  constructor(
    private httpCountries: CountriesService,
    private fservice: FormBuilder,
    private candidatParcours : CandidatParcoursService,
    private candidatService : CandidatService
    ) { }


  private countries: any;
  public _cities: Array<string> = [];
  public candidatLicence : Diplome | undefined;
  public message !: string;
  public LicenceExist:boolean = false;

  public mentions = this.candidatService.mentions;
  public TypesLicence = this.candidatService.TypesCI;


  //remember that type will always be bac in this case so in case of post 

  isUpdating = false;
  permitUpdate = true;
  errorText: string | undefined;
  isFetchingInfo = true;
  public selectedFile: File | undefined;


  public candidatLicenceForm = <RxFormGroup> this.fservice.group({

    intitule: [DiplomeType.LICENCE],
    type: [DiplomeType.LICENCE, Validators.required],
    dateCommission: ['', Validators.required],
    pays: ['', Validators.required],
    ville: ['', Validators.required],
    province: ['', Validators.required],
    mention: ['', Validators.required],
    etablissement: ['', Validators.required],
    specialite: ['', Validators.required],
    moyen_generale: ['', Validators.required],
    licence_diplome : [''],
    releves_licence: ['']

  })

  ngOnInit(): void {

    this.candidatLicenceForm.get('intitule')?.disable();
    this.candidatLicenceForm.get('type')?.disable();
    this.httpCountries.getCountries().
      subscribe(
        res => {
          this.countries = res.data;
        }
      )

    this.getLicenceInfo();
    alert(this.mentions)
    

  }

  getLicenceInfo(){
    this.candidatParcours.getDiplomes().then(res=>{

      this.isFetchingInfo = false;
      this.result = res;

      const index = this.result.results.findIndex((object: any) => {
        return object.type === DiplomeType.LICENCE; // temporarly
      });

      if(index !== -1) {
      
      this.candidatLicence = this.result.results[index];
      this.LicenceExist = true;
      this.candidatLicenceForm.disable();
      this.candidatLicenceForm.get('intitule')?.setValue(this.candidatLicence?.intitule);
      this.candidatLicenceForm.get('type')?.setValue(this.candidatLicence?.type);
      this.candidatLicenceForm.get('mention')?.setValue(this.candidatLicence?.mention);
      this.candidatLicenceForm.get('moyen_generale')?.setValue(this.candidatLicence?.moyen_generale);
      this.candidatLicenceForm.get('pays')?.setValue(this.candidatLicence?.pays);
      this.candidatLicenceForm.get('dateCommission')?.setValue(this.candidatLicence?.dateCommission);
      this.candidatLicenceForm.get('etablissement')?.setValue(this.candidatLicence?.etablissement);
      this.candidatLicenceForm.get('specialite')?.setValue(this.candidatLicence?.specialite);
      this.candidatLicenceForm.get('province')?.setValue(this.candidatLicence?.province);
      this.candidatLicenceForm.get('ville')?.setValue(this.candidatLicence?.ville);
         
      const annexe:Annexe | undefined =  this.candidatLicence?.annexe;

      console.log(this.candidatLicence?.annexe);

      }

      else {
        this.message = 'vous pouvez continuer a modifier votre parcours'
        this.LicenceExist = false;
      }

          
      })
  }

  get _countries() {

    return this.countries;
  }

  enableUpdate(){
    this.candidatLicenceForm.enable();
    this.candidatLicenceForm.get('intitule')?.disable();
    this.candidatLicenceForm.get('type')?.disable();
  }

  addBac(){
    this.errorText = undefined;
    this.isUpdating = true;

    let formdata = this.candidatLicenceForm.toFormData();
  
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



