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
  disable,
  even,
  RxFormBuilder,
  RxFormGroup,
} from '@rxweb/reactive-form-validators';

@Component({
  selector: '[app-bac]',
  templateUrl: './bac.component.html',
  styleUrls: ['./bac.component.css'],
})
export class BacComponent implements OnInit {
  constructor(
    private httpCountries: CountriesService,
    private fservice: RxFormBuilder,
    private candidatParcours: CandidatParcoursService,
    private candidatService: CandidatService
  ) {}

  public countries: any;
  public candidatBac: Diplome | undefined;
  public message!: string;
  public isFetchingInfo: boolean = false;
  public errorText: string | undefined;
  public isUpdating: boolean = false;

  public mentions = this.candidatService.mentions;
  public bacTypes = this.candidatService.TypeBac;

  public diplomeFile: File | undefined;
  public releveFile: File | undefined;
  DIPLOME_FILE = 'dfile';
  RELEVE_FILE = 'rfile';
  public bacExists = false;

  public candidatBacForm = <RxFormGroup>this.fservice.group({
    intitule: ['Baccalauréat'],
    type: ['baccalauréat'],
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
  }

  onSubmit() {
    this.isUpdating = true;
    const formData = this.candidatBacForm.toFormData();
    formData.set('diplomeFile', formData.get('diplomeFile[0]'));
    formData.set('releveFile', formData.get('relevefile[0]'));
    formData.delete('releveFile[0]');
    formData.delete('diplomeFile[0]');
    console.log(formData.get('releveFile'));
    console.log(formData.get('diplomeFile'));
    this.candidatParcours
      .addDiplome(formData)
      .then((d) => console.log(d))
      .catch((err) => console.log(err))
      .finally(() => (this.isUpdating = false));
  }

  onFileSelected(event: Event, type: string) {
    this.errorText = undefined;
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 4194304) {
        if (type === this.DIPLOME_FILE) {
          this.candidatBacForm.controls['bac_diplome'].setValue('');
          this.errorText =
            'La taille du fichier du diplome ne peut pas être supérieure à 4 Mo';
        } else if (type === this.RELEVE_FILE) {
          this.candidatBacForm.controls['releves'].setValue('');
          this.errorText =
            'La taille du fichier du releve ne peut pas être supérieure à 4 Mo';
        }
        return;
      }
      if (type == this.DIPLOME_FILE) {
        this.diplomeFile = file;
      } else if (type == this.RELEVE_FILE) {
        this.releveFile = file;
      }
    }
  }
}
