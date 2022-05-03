import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Config from 'src/app/models/Config';
import { Sujet } from 'src/app/models/Sujet';
import { CandidatPostulerService } from '../../services/candidat-postuler.service';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: '[app-choisir-sujets]',
  templateUrl: './choisir-sujets.component.html',
  styleUrls: ['./choisir-sujets.component.css'],
})
export class ChoisirSujetsComponent implements OnInit {
  public sujets: Sujet[] = [];
  public labo: string = '';
  public formationDotorale: string = '';
  public sujet: string = '';
  public page: number = 1;
  public config!: Config;
  public nbrSujetsChoisies: number | undefined = 0;
  public nbrSujetsAPostuler: number | undefined = 0;
  isDisabled: boolean = false;
  itemsCount: number | undefined;

  constructor(
    public candidatPostuler: CandidatPostulerService,
    public candidatConfig: CandidatService
  ) {}

  ngOnInit(): void {
    this.getPublishedSujets();
    this.getConfigInfo();
  }

  getPublishedSujets() {
    this.candidatPostuler.getPublishedSubjects().then((res) => {
      this.sujets = res.results;
      this.itemsCount = res.count;
    });
  }

  getConfigInfo() {
    this.candidatConfig.getConfigInfo().then((res) => {
      this.config = res;
      this.nbrSujetsAPostuler = this.config.max_sujet_postuler;
    });
  }

  searchLabo() {
    if (this.labo === '') {
      this.ngOnInit();
    } else {
      this.sujets = this.sujets.filter((res) => {
        return res.titre
          .toLocaleLowerCase()
          .match(this.labo.toLocaleLowerCase());
      });
    }
  }

  searchFormation() {
    if (this.formationDotorale === '') {
      this.ngOnInit();
    } else {
      this.sujets = this.sujets.filter((res) => {
        return res.formationDoctorale.titre
          .toLocaleLowerCase()
          .match(this.formationDotorale.toLocaleLowerCase());
      });
    }
  }

  searchSujet() {
    if (this.sujet === '') {
      this.ngOnInit();
    } else {
      this.sujets = this.sujets.filter((res) => {
        return res.titre
          .toLocaleLowerCase()
          .match(this.sujet.toLocaleLowerCase());
      });
    }
  }

  choseSujet(s: Sujet, event) {
    if (event.target.checked) {
      this.nbrSujetsChoisies++;
    }

    if (!event.target.checked) {
      this.nbrSujetsChoisies--;
    }

    if (this.nbrSujetsChoisies >= this.nbrSujetsAPostuler) {
      this.isDisabled = true;
    }
  }

  onIndexChange(offset: number) {
    console.log(offset);
  }
}
