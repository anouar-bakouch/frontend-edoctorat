import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Diplome } from 'src/app/models/Diplome';
import Result from 'src/app/models/Result';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CountriesService } from '../../services/countries.service';
import { DiplomeType } from 'src/app/enums/DiplomeType';
import { CandidatService } from '../../services/candidat.service';
import { Annexe } from 'src/app/models/Annexe';
import {
  even,
  RxFormBuilder,
  RxFormGroup,
} from '@rxweb/reactive-form-validators';
import * as swal from 'sweetalert';

@Component({
  selector: '[app-c-ingenieur]',
  templateUrl: './c-ingenieur.component.html',
  styleUrls: ['./c-ingenieur.component.css'],
})
export class CIngenieurComponent implements OnInit {
  result!: Result<Diplome>;

  constructor(
    private httpCountries: CountriesService,
    private fservice: FormBuilder,
    private candidatParcours: CandidatParcoursService,
    private candidatService: CandidatService
  ) {}

  private countries: any;
  public _cities: Array<string> = [];
  public candidatCI: Diplome | undefined;
  public message!: string;
  public CIExist: boolean = false;

  public mentions = this.candidatService.mentions;
  public TypesCI = this.candidatService.TypesCI;

  //remember that type will always be bac in this case so in case of post

  isUpdating = false;
  permitUpdate = true;
  errorText: string | undefined;
  isFetchingInfo = true;
  public selectedFile: File | undefined;
  DIPLOME_FILE = 'dfile';
  RELEVE_FILE = 'rfile';
  diplomeFileLink: string | undefined;
  releveFileLink: string | undefined;


  public candidatCIForm = <RxFormGroup>this.fservice.group({
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
    diplomeFile: [''],
    releveFile: ['']
  });

  ngOnInit(): void {
    ngOnInit(): void {
      this.httpCountries.getCountries().subscribe((res) => {
        this.countries = res.data;
      });
  
      this.candidatParcours
        .getDiplomes(DiplomeType.CI)
        .then((diplome) => {
          if (diplome) {
            diplome = diplome as Diplome;
            this.diplome = diplome;
            this.CIExist = true;
            this.candidatCIForm.controls['dateCommission'].setValue(
              diplome.dateCommission
            );
            this.candidatCIForm.controls['pays'].setValue(diplome.pays);
            this.candidatCIForm.controls['ville'].setValue(diplome.ville);
            this.candidatCIForm.controls['province'].setValue(diplome.province);
            this.candidatCIForm.controls['mention'].setValue(diplome.mention);
            this.candidatCIForm.controls['etablissement'].setValue(
              diplome.etablissement
            );
            this.candidatCIForm.controls['specialite'].setValue(
              diplome.specialite
            );
            this.candidatCIForm.controls['moyen_generale'].setValue(
              diplome.moyen_generale
            );
            this.candidatCIForm.controls['moyen_generale'].setValue(
              diplome.moyen_generale
            );
            this.candidatCIForm.controls['diplomeFile'].removeValidators(
              Validators.required
            );
            this.candidatCIForm.controls['relevefile'].removeValidators(
              Validators.required
            );
            diplome.annexes.forEach((annexe) => {
              if (annexe.typeAnnexe == TypeAnnexeEnum.DIPLOME) {
                this.diplomeFileLink = annexe.pathFile.substring(
                  annexe.pathFile.lastIndexOf('/') + 1
                );
              } else if (annexe.typeAnnexe == TypeAnnexeEnum.RELEVE) {
                this.releveFileLink = annexe.pathFile.substring(
                  annexe.pathFile.lastIndexOf('/') + 1
                );
              }
            });
          }
        })
        .finally(() => (this.isFetchingInfo = false));
    }
  }

  getCIInfo() {
    this.candidatParcours.getDiplomes().then((res) => {
      console.log(res);
      this.isFetchingInfo = false;
      this.result = res as Result<Diplome>;

      const index = this.result.results.findIndex((object: any) => {
        return object.intitule === DiplomeType.CI; // temporarly
      });

      if (index !== -1) {
        this.candidatCI = this.result.results[index];
        this.CIExist = true;
        this.candidatCIForm.disable();
        this.candidatCIForm
          .get('intitule')
          ?.setValue(this.candidatCI?.intitule);
        this.candidatCIForm.get('type')?.setValue(this.candidatCI?.type);
        this.candidatCIForm.get('mention')?.setValue(this.candidatCI?.mention);
        this.candidatCIForm
          .get('moyen_generale')
          ?.setValue(this.candidatCI?.moyen_generale);
        this.candidatCIForm.get('pays')?.setValue(this.candidatCI?.pays);
        this.candidatCIForm
          .get('dateCommission')
          ?.setValue(this.candidatCI?.dateCommission);
        this.candidatCIForm
          .get('etablissement')
          ?.setValue(this.candidatCI?.etablissement);
        this.candidatCIForm
          .get('specialite')
          ?.setValue(this.candidatCI?.specialite);
        this.candidatCIForm
          .get('province')
          ?.setValue(this.candidatCI?.province);
        this.candidatCIForm.get('ville')?.setValue(this.candidatCI?.ville);

        // const annexe: Annexe | undefined = this.candidatCI?.annexe;

        // console.log(this.candidatCI?.annexe);
      } else {
        this.message = 'vous pouvez continuer a modifier votre parcours';
        this.CIExist = false;
      }
    });
  }

  get _countries() {
    return this.countries;
  }

  onSubmit() {
    this.isUpdating = true;
    const formData = this.candidatCIForm.toFormData();
    formData.set('diplomeFile', formData.get('diplomeFile[0]'));
    formData.set('releveFile', formData.get('relevefile[0]'));
    formData.delete('releveFile[0]');
    formData.delete('diplomeFile[0]');
    if (!this.CIExists) {
      this.candidatParcours
        .addDiplome(formData)
        .then((_) => {
          swal({
            icon: 'success',
          });
        })
        .catch((_) => {
          this.errorText =
            "Une erreur s'est produite de notre côté, réessayez plus tard.";
        })
        .finally(() => (this.isUpdating = false));
    } else {
      if (formData.get('diplomeFile') === 'null') {
        formData.delete('diplomeFile');
      }
      if (formData.get('releveFile') === 'null') {
        formData.delete('releveFile');
      }
      this.candidatParcours
        .updateDiplome(formData, this.diplome.id)
        .then((_) =>
          swal({
            icon: 'success',
          })
        )
        .catch((_) => {
          this.errorText =
            "Une erreur s'est produite de notre côté, réessayez plus tard.";
        })
        .finally(() => (this.isUpdating = false));
    }
  }

  onFileSelected(event: Event, type: string) {
    this.errorText = undefined;
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 4194304) {
        if (type === this.DIPLOME_FILE) {
          this.candidatCIForm.controls['diplomeFile'].setValue('');
          this.errorText =
            'La taille du fichier du diplome ne peut pas être supérieure à 4 Mo';
        } else if (type === this.RELEVE_FILE) {
          this.candidatCIForm.controls['relevefile'].setValue('');
          this.errorText =
            'La taille du fichier du releve ne peut pas être supérieure à 4 Mo';
        }
        return;
      }
    }
  }

  
}
