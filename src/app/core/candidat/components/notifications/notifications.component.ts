import { Component, OnInit } from '@angular/core';
import { CandidatNotificationsService } from '../../services/candidat-notifications.service';
import { Notification } from 'src/app/models/Notification';
import { Sujet } from 'src/app/models/Sujet';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Commission } from 'src/app/models/Commission';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {

  public notifications: Notification [] = [];
  public resultats : {
                        id:number,
                        commission:Commission,
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
      res.results.forEach(x=>{
        if(x.type.toLocaleLowerCase() === NotificationType.res.toLocaleLowerCase()){
             this.resultats.push(x);
        }
        if(x.type.toLocaleLowerCase() === NotificationType.com.toLocaleLowerCase()) {
          this.notifications.push(x);
        }
      }
    
      )
    })
    .catch(error=>{
      console.log(error)
    })
    .finally(()=>{
     
    })
  }

  choseSubject(x){
   this.candidatNotifications.sendSubjectChosen(x)
   .then(x=>{
    console.log(x);
   })
   .catch(error=>{
    console.log(error)
   })
   .finally()
  }

}
