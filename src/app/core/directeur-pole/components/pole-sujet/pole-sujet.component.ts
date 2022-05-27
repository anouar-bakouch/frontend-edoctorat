import { Component, OnInit } from '@angular/core';
import { Sujet } from 'src/app/models/Sujet';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { PoleSujetService } from '../../services/pole-sujet.service';

@Component({
  selector: 'app-pole-sujet',
  templateUrl: './pole-sujet.component.html',
  styleUrls: ['./pole-sujet.component.css']
})

export class PoleSujetComponent implements OnInit {

  public alert: AlertData | undefined = undefined;
  public loading: boolean = false;
  public page: number = 1;
  public itemsCount: number | undefined;
  public Psujets : Sujet [] = [];
  public sujet_:string = '';
  public formationDoctorale_:string = '';
  public isFetchingItems = true;
  public errorText:string = '';
  public laboratoire_:string = '';

  constructor(public poleS : PoleSujetService) { }

  ngOnInit(): void {
    this.getPoleSubjects();
  }

  public getPoleSubjects(){
    this.poleS.fetchPoleSujets()
    .then(x=>{
      this.isFetchingItems = false;
      this.Psujets = x.results;
      this.itemsCount = x.count;
    }
      )
    .catch(error=>{
      this.alert = {
        type: 'loading',
        message: "error lors de la suppression",
      };
    })
  }

    // search partie

    searchFormation() {
      if (this.formationDoctorale_ === '') {
        this.ngOnInit();
      } else {
        this.Psujets = this.Psujets.filter((res) => {
          return res.formationDoctorale.titre
            .toLocaleLowerCase()
            .match(this.formationDoctorale_.toLocaleLowerCase());
        });
      }
    }

    searchSujet() {
      if (this.sujet_ === '') {
        this.ngOnInit();
      } else {
        this.Psujets = this.Psujets.filter((res) => {
          return res.titre
            .toLocaleLowerCase()
            .match(this.sujet_.toLocaleLowerCase());
        });
      }
    }

    searchLaboratoire() {
      if (this.laboratoire_ === '') {
        this.ngOnInit();
      } else {
        this.Psujets = this.Psujets.filter((res) => {
          return res['laboratoire'].nom
            .toLocaleLowerCase()
            .match(this.laboratoire_.toLocaleLowerCase());
        });
      }
    }

    onIndexChange(offset: number) {
      if (this.isFetchingItems) return;
      this.isFetchingItems = true;
      this.poleS
        .fetchPoleSujets(offset)
        .then((d) => {
          this.Psujets = d.results;
        })
        .finally(() => (this.isFetchingItems = false));
    }

}
