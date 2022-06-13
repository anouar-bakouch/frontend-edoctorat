import { Component, OnInit } from '@angular/core';
import { CandidatNotificationsService } from '../../services/candidat-notifications.service';
import { Notification } from 'src/app/models/Notification';
import { Sujet } from 'src/app/models/Sujet';
import { NotificationType } from 'src/app/enums/NotificationType';
import { Commission } from 'src/app/models/Commission';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {

  public authorized:boolean = true;
  public notifications: Notification [] = [];
  public resultats : {
                        id:number,
                        commission:Commission,
                        sujet:Sujet,
                        type:string
                      }[] = [];
  public isFetchingItems:boolean = true;
  closeResult: string;

  constructor(
    private candidatNotifications : CandidatNotificationsService,
    private modalService: NgbModal) { }

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
             this.resultats.forEach(sel=>{
              if(sel['selected']){
                this.authorized = false;
              }
             })
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

  choseSubject(x,content:any){
    console.log(x);
    this.candidatNotifications.sendSubjectChosen(x)
    .then(x=>{
     console.log(x);
     this.open(content);
   })
   .catch(error=>{
    console.log(error);

   })
   .finally()
  }

  openModal(content:any){
    this.open(content);
  }

  open(content: any) {
  
    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




}
