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

  public CalendarProf:Calendrier [] = [];
  public CalendarDoctorant:Calendrier[] = [];
  public isFetchingInfo = true;
  public calendar:Array<Calendrier> = [];
  public errorText:string;

  constructor(private _calendarService:CalendarService) { }

  ngOnInit(): void {
   
    this.getInfos();
   
  }

  getInfos(){
    
    this._calendarService.getCalenders().then(
     (element)=>{

      alert(element.results.length)
       this.isFetchingInfo = false;
    
       if(element.results.length <= 0 ){
        this.errorText = "aucune information disponible pour le moment";
      }
       
       element.results.forEach(el=>{

        this.calendar.push(el);
       }
       ) 
     
     this.calendar.forEach(x=>{
      if(x.pour.toLocaleLowerCase() === CalendrierType.Calendar_Prof){
        this.CalendarProf.push(x);
      }
      else {
      this.CalendarDoctorant.push(x);
      }
     })  
       

      }

      

    ).catch(x=>{
      alert(x);
    }).finally(()=>{
     
    })

   
  }

}

