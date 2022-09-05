import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Diplome } from 'src/app/models/Diplome';
import Result from 'src/app/models/Result';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CountriesService } from '../../services/countries.service';
import { DiplomeType } from 'src/app/enums/DiplomeType';
import { CandidatService } from '../../services/candidat.service';

import {
  RxFormGroup,
} from '@rxweb/reactive-form-validators';
import swal from 'sweetalert';
import { TypeAnnexeEnum } from 'src/app/enums/TypeAnnexeEnum';

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

  public countries: any;
  public _cities: Array<string> = [];
  public candidatCI: Diplome | undefined;
  public CIExist = false;

  public mentions = this.candidatService.mentions;
  public TypesCI = this.candidatService.TypesCI;

  //remember that type will always be bac in this case so in case of post

  public message!: string;
  public isFetchingInfo = true;
  public errorText: string | undefined;
  public isUpdating = false;
  public selectedFile: File | undefined;
  DIPLOME_FILE = 'dfile';
  RELEVE_FILE = 'rfile';
  diplomeFileLink: string | undefined;
  releveFileLink: string | undefined;
  diplome :Diplome | undefined;
  CIExists  = false;


  public candidatCIForm = <RxFormGroup>this.fservice.group({
    intitule: [DiplomeType.CI],
    type: [DiplomeType.CI],
    dateCommission: ['', Validators.required],
    pays: ['', Validators.required],
    ville: ['', Validators.required],
    province: ['', Validators.required],
    mention: ['', Validators.required],
    etablissement: ['', Validators.required],
    specialite: ['', Validators.required],
    moyen_generale: ['', Validators.required],
    diplomeFile: ['', Validators.required],
    relevefile: ['', Validators.required],
  });


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