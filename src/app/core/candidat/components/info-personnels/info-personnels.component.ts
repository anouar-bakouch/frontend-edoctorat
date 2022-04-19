import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Candidat } from 'src/app/models/Candidat';
import { CandidatService } from '../../services/candidat.service';
import { CountriesService } from '../../services/countries.service';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-info-personnels',
  templateUrl: './info-personnels.component.html',
  styleUrls: ['./info-personnels.component.css'],
})
export class InfoPersonnelsComponent implements OnInit {
  isUpdating = false;
  private countries: any;
  public selectedFile: File | undefined;
  public candidatInfoForm = <RxFormGroup>this.fservice.group({
    prenom: [''],
    nom: [''],
    nomCandidatAr: [''],
    prenomCandidatAr: [''],
    cin: [''],
    cne: [''],
    adresse: [''],
    adresseAr: [''],
    pays: [''],
    sexe: [''],
    villeDeNaissance: [''],
    villeDeNaissanceAr: [''],
    ville: [''],
    dateDeNaissance: [''],
    typeDeHandiCape: [''],
    academie: [''],
    mailCandidat: [''],
    telCandidat: [''],
    pathPhoto: [''],
    situation_familiale: [''],
    fonctionnaire: [''],
  });

  public candidatInfo: Candidat | undefined;

  constructor(
    private httpCountries: CountriesService,
    private fservice: RxFormBuilder,
    private candidatService: CandidatService
  ) {}

  ngOnInit(): void {
    this.httpCountries.getCountries().subscribe((res) => {
      this.countries = res.data;
    });

    this.getCandidatInfo();
  }

  get _countries() {
    return this.countries;
  }

  getCandidatInfo() {
    this.candidatService.getCandidatInfo().then((res) => {
      console.log(res);
      this.candidatInfo = res;
      this.candidatInfoForm.get('prenom')?.setValue(this.candidatInfo.prenom);
      this.candidatInfoForm
        .get('prenomCandidatAr')
        ?.setValue(this.candidatInfo.prenomCandidatAr);
      this.candidatInfoForm.get('nom')?.setValue(this.candidatInfo.nom);
      this.candidatInfoForm
        .get('nomCandidatAr')
        ?.setValue(this.candidatInfo.nomCandidatAr);
      this.candidatInfoForm.get('cin')?.setValue(this.candidatInfo.cin);
      this.candidatInfoForm.get('cne')?.setValue(this.candidatInfo.cne);
      this.candidatInfoForm.get('adresse')?.setValue(this.candidatInfo.adresse);
      this.candidatInfoForm
        .get('adresseAr')
        ?.setValue(this.candidatInfo.adresseAr);
      this.candidatInfoForm.get('pays')?.setValue(this.candidatInfo.pays);
      this.candidatInfoForm.get('ville')?.setValue(this.candidatInfo.ville);
      this.candidatInfoForm
        .get('villeDeNaissance')
        ?.setValue(this.candidatInfo.villeDeNaissance);
      this.candidatInfoForm
        .get('villeDeNaissanceAr')
        ?.setValue(this.candidatInfo.villeDeNaissanceAr);
      this.candidatInfoForm
        .get('dateDeNaissance')
        ?.setValue(this.candidatInfo.dateDeNaissance);
      this.candidatInfoForm
        .get('typeHandicap')
        ?.setValue(this.candidatInfo.typeDeHandiCape);
      this.candidatInfoForm
        .get('academie')
        ?.setValue(this.candidatInfo.academie);
      this.candidatInfoForm
        .get('mailCandidat')
        ?.setValue(this.candidatInfo.email);
      this.candidatInfoForm
        .get('telCandidat')
        ?.setValue(this.candidatInfo.telCandidat);
      this.candidatInfoForm
        .get('situation_familiale')
        ?.setValue(this.candidatInfo.situation_familiale);
      this.candidatInfoForm
        .get('foctionnaire')
        ?.setValue(this.candidatInfo.fonctionnaire);
      this.candidatInfoForm.get('sexe')?.setValue(this.candidatInfo.sexe);
    });
  }

  updateCandidatInfo() {
    let formdata = this.candidatInfoForm.toFormData();
    this.selectedFile &&
      formdata.set('pathPhoto', this.selectedFile, this.selectedFile.name);
    this.candidatService.updateCandidatInfo(formdata);
  }

  public onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = <File>event.target.files[0];
    }
  }
}
