import { Component, OnInit } from '@angular/core';
import { CandidatNotificationsService } from '../../services/candidat-notifications.service';
import { Notification } from 'src/app/models/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {

  public notifications: Notification [] = [];
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
    })
    .catch(error=>{
      console.log(error)
    })
    .finally(()=>{
     
    })
  }

}
