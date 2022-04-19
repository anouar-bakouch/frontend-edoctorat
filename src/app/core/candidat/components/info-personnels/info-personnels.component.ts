import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Candidat } from 'src/app/models/Candidat';
import { environment } from 'src/environments/environment';
import { CandidatService } from '../../services/candidat.service';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-info-personnels',
  templateUrl: './info-personnels.component.html',
  styleUrls: ['./info-personnels.component.css'],
})
export class InfoPersonnelsComponent implements OnInit {
  private countries: any;
  public candidatInfoForm = this.fservice.group({
    prenomCandidat: [''],
    nomCandidat: [''],
    nomCandidatAr: [''],
    prenomCandidatAr: [''],
    cinCandidat: [''],
    cneCandidat: [''],
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
    fonctionnaire : ['']
  });


  public candidatInfo: Candidat | undefined;

  constructor(
    private httpCountries: CountriesService,
    private fservice: FormBuilder,
    private candidatService: CandidatService
  ) {}

  ngOnInit(): void {

    this.httpCountries.getCountries().subscribe((res) => {
      this.countries = res.data;
    });

    this.candidatService.getCandidatInfo().then(res=>{
      this.candidatInfo = res;
      this.candidatInfoForm.get('prenomCandidat')?.setValue(this.candidatInfo.prenom);
      this.candidatInfoForm.get('prenomCandidatAr')?.setValue(this.candidatInfo.prenomCandidatAr);
      this.candidatInfoForm.get('nomCandidat')?.setValue(this.candidatInfo.nom);
      this.candidatInfoForm.get('nomCandidatAr')?.setValue(this.candidatInfo.nomCandidatAr);
      this.candidatInfoForm.get('cin')?.setValue(this.candidatInfo.cin);
      this.candidatInfoForm.get('cne')?.setValue(this.candidatInfo.cne);
      this.candidatInfoForm.get('adresse')?.setValue(this.candidatInfo.adresse);
      this.candidatInfoForm.get('adresseAr')?.setValue(this.candidatInfo.adresseAr);
      this.candidatInfoForm.get('pays')?.setValue(this.candidatInfo.pays);
      this.candidatInfoForm.get('ville')?.setValue(this.candidatInfo.ville);
      this.candidatInfoForm.get('villeDeNaissance')?.setValue(this.candidatInfo.villeDeNaissance);
      this.candidatInfoForm.get('villeDeNaissanceAr')?.setValue(this.candidatInfo.villeDeNaissanceAr);
      this.candidatInfoForm.get('dateDeNaissance')?.setValue(this.candidatInfo.dateDeNaissance);
      this.candidatInfoForm.get('typeHandicap')?.setValue(this.candidatInfo.typeDeHandiCape);
      this.candidatInfoForm.get('academie')?.setValue(this.candidatInfo.academie);
      this.candidatInfoForm.get('mailCandidat')?.setValue(this.candidatInfo.email);
      this.candidatInfoForm.get('telCandidat')?.setValue(this.candidatInfo.telCandidat);
      this.candidatInfoForm.get('pathPhoto')?.setValue(this.candidatInfo.pathPhoto);
      this.candidatInfoForm.get('situation_familiale')?.setValue(this.candidatInfo.situation_familiale);
      this.candidatInfoForm.get('foctionnaire')?.setValue(this.candidatInfo.fonctionnaire);
      
    })
    
  }

  get _countries() {
    return this.countries;
  }



}
