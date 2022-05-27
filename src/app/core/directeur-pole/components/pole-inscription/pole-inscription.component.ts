import { Component, OnInit } from '@angular/core';
import { Inscription } from 'src/app/models/Inscription';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { PoleInscriptionService } from '../../services/pole-inscription.service';

@Component({
  selector: 'app-pole-inscription',
  templateUrl: './pole-inscription.component.html',
  styleUrls: ['./pole-inscription.component.css']
})


export class PoleInscriptionComponent implements OnInit {

  public PInscriptions : Inscription [] = []; 
  public alert: AlertData | undefined = undefined;
  public isFetchingItems = true;
  public loading:boolean = false;
  public sujet_:string = '';
  public formationDoctorale_:string = '';
  public errorText:string = '';
  public laboratoire_:string = '';
  public itemsCount: number | undefined;

  constructor(public poleS:PoleInscriptionService) { }

  ngOnInit(): void {
    this.getPoleInscriptions();
  }

  public getPoleInscriptions(){
     this.poleS.fetchPoleInscriptions()
     .then(x=>{
      this.PInscriptions = x.results;
      this.isFetchingItems = false;
      this.itemsCount = x.count;
     })
     .catch(error=>{
      this.alert = {
        type: 'loading',
        message: "error lors de la suppression",
      };
     })
     .finally(()=>{
      this.loading = false
      setTimeout(() => (this.alert = undefined), 3000);
     })

    
  }

      // search partie

      searchFormation() {
        if (this.formationDoctorale_ === '') {
          this.ngOnInit();
        } else {
          this.PInscriptions = this.PInscriptions.filter((res) => {
            return res['formationDoctorale']
              .toLocaleLowerCase()
              .match(this.formationDoctorale_.toLocaleLowerCase());
          });
        }
      }
  
      searchSujet() {
        if (this.sujet_ === '') {
          this.ngOnInit();
        } else {
          this.PInscriptions = this.PInscriptions.filter((res) => {
            return res.sujet.titre
              .toLocaleLowerCase()
              .match(this.sujet_.toLocaleLowerCase());
          });
        }
      }
  
      searchLaboratoire() {
        if (this.laboratoire_ === '') {
          this.ngOnInit();
        } else {
          this.PInscriptions = this.PInscriptions.filter((res) => {
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
          .fetchPoleInscriptions(offset)
          .then((d) => {
            this.PInscriptions = d.results;
          })
          .finally(() => (this.isFetchingItems = false));
      }

}
