import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Candidat } from 'src/app/models/Candidat';
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
    
  }

  get _countries() {
    return this.countries;
  }
}
