import { Component, OnInit } from '@angular/core';
import { CandidatNotificationsService } from '../../services/candidat-notifications.service';
import { Notification } from 'src/app/models/Notification';
import { Sujet } from 'src/app/models/Sujet';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {

  public notifications: Notification [] = [];
  public resultats : {
                        id:number,
                        commission:null,
                        sujet:Sujet,
                        type:string
                      }[] = [];
  public isFetchingItems:boolean = true;

  constructor(private candidatNotifications : CandidatNotificationsService) { }

  ngOnInit(): void {
      this.getNotifications();
  }

  getNotifications(){
    this.candidatNotifications.getNotifications()
    .then(res=>{
      this.isFetchingItems = false;
      this.notifications = res.results;

      this.notifications.forEach(x=>{
        if(x.type === 'RESULTAT'){
          
        }
      })

    })
    .catch(error=>{
      console.log(error)
    })
    .finally(()=>{
     
    })
  }

}
