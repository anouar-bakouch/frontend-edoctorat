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
  public maxSujets: number | undefined = 0;
  itemsCount: number | undefined;
  isFetchingItems = true;
  selectedSubjectsId: number[] = [];

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
      this.isFetchingItems = false;
    });
  }

  getConfigInfo() {
    this.candidatConfig.getConfigInfo().then((res) => {
      this.config = res;
      this.maxSujets = this.config.max_sujet_postuler;
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

  onSelectSubjet(event: Event, subjet_id: number) {
    const target = event.target as HTMLInputElement;
    if (!target.checked) {
      const index = this.selectedSubjectsId.indexOf(subjet_id);
      if (index > -1) {
        this.selectedSubjectsId.splice(index, 1);
        return;
      }
    }
    if (this.selectedSubjectsId.length >= this.maxSujets) return;
    this.selectedSubjectsId.push(subjet_id);
  }

  onIndexChange(offset: number) {
    if (this.isFetchingItems) return;
    this.isFetchingItems = true;
    this.candidatPostuler
      .getPublishedSubjects(offset)
      .then((d) => {
        this.sujets = d.results;
      })
      .finally(() => (this.isFetchingItems = false));
  }
}
