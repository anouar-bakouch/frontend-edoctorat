import { Component, OnInit } from '@angular/core';
import { CalendrierType } from 'src/app/enums/CalendrierType';
import { Calendrier } from 'src/app/models/Calendrier';
import Result from 'src/app/models/Result';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: '[app-calendrier]',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})

export class CalendrierComponent implements OnInit {

  public CalendarProf:Array<Calendrier> | undefined = [];
  public CalendarDoctorant:Array<Calendrier> | undefined= [];
  isFetchingInfo = true;
  public calendar:Array<Calendrier> = [];
  errorText:string ;

  constructor(public calendarService:CalendarService) { }

  ngOnInit(): void {
   this.getInfos();
  }

  getInfos(){
    
    this.calendarService.getCalenders().then(
      element=>{
       this.isFetchingInfo = false;
       this.calendar = element.results;
       this.calendar.forEach(el=>{
        alert(el);
        if(el.pour.toLocaleLowerCase() === CalendrierType.Calendar_Prof){
          this.CalendarProf.push(el);
        }
        else 
        this.CalendarDoctorant.push(el);
       }) 
      }
    ).catch(x=>{
      alert(x);
    })

   
  }

}

