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

@Component({
  selector: '[app-bac]',
  templateUrl: './bac.component.html',
  styleUrls: ['./bac.component.css'],
})
export class BacComponent implements OnInit {
  constructor(
    private httpCountries: CountriesService,
    private fservice: FormBuilder,
    private candidatParcours: CandidatParcoursService,
    private candidatService: CandidatService
  ) {}

  public countries: any;
  public candidatBac: Diplome | undefined;
  public message!: string;
  public isFetchingInfo: boolean = false;
  public errorText: string | undefined;

  public mentions = this.candidatService.mentions;
  public bacTypes = this.candidatService.TypeBac;

  public diplomeFile: File | undefined;
  public releveFile: File | undefined;
  DIPLOME_FILE = 'dfile';
  RELEVE_FILE = 'rfile';

  public candidatBacForm = <RxFormGroup>this.fservice.group({
    intitule: ['Baccalauréat'],
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
    releves: [''],
  });

  ngOnInit(): void {
    this.candidatBacForm.get('intitule')?.disable();
    this.candidatBacForm.get('type')?.disable();
    this.httpCountries.getCountries().subscribe((res) => {
      this.countries = res.data;
    });
  }

  onSubmit() {}

  onFileSelected(event: Event, type: string) {
    this.errorText = undefined;
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > 4194304) {
        this.errorText =
          type == this.DIPLOME_FILE
            ? 'La taille du fichier du diplome ne peut pas être supérieure à 4 Mo'
            : 'La taille du fichier du releve ne peut pas être supérieure à 4 Mo';
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
