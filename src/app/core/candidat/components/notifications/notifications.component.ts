import { Component, OnInit } from '@angular/core';
import Result from 'src/app/models/Result';
import { CandidatNotificationsService } from '../../services/candidat-notifications.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {

  public notifications: Notification [] = [];

  constructor(private candidatNotifications : CandidatNotificationsService) { }

  ngOnInit(): void {
      this.getNotifications();
  }

  getNotifications(){
    this.candidatNotifications.getNotifications()
    .then(res=>{
      console.log(res);
    })
  }

}
