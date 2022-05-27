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

  constructor(public poleS:PoleInscriptionService) { }

  ngOnInit(): void {
    this.getPoleInscriptions();
  }

  public getPoleInscriptions(){
     this.poleS.fetchPoleInscriptions()
     .then(x=>{
      this.PInscriptions = x.results;
     })
     .catch(error=>{
      this.alert = {
        type: 'loading',
        message: "error lors de la suppression",
      };
     })
     .finally()
  }

}
