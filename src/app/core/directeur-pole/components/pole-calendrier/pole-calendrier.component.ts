import { Component, OnInit } from '@angular/core';
import { Calendrier } from 'src/app/models/Calendrier';
import { AlertData } from 'src/app/shared/components/alert/alert.component';
import { PoleCalendrierService } from '../../services/pole-calendrier.service';

@Component({
  selector: 'app-pole-calendrier',
  templateUrl: './pole-calendrier.component.html',
  styleUrls: ['./pole-calendrier.component.css']
})
export class PoleCalendrierComponent implements OnInit {

  alertData: AlertData | undefined = {
    message: "S'il vous plaît, attendez", type: "loading"
  };

  calendrierData: Calendrier[] | undefined

  constructor(private service: PoleCalendrierService) { }

  ngOnInit(): void {
    this.service.fetchCalendrier().then(data => {
      this.calendrierData = data
      this.alertData = undefined
    }).catch(() => {
      this.alertData = { message: "Erreur lors de la récupération des données", type: "error" }
    }).finally(() => setTimeout(() => this.alertData = undefined, 3000));
  }

}
