import { Component, Input, OnInit } from '@angular/core';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import Result from 'src/app/models/Result';
import { HttpService } from '../../services/http.service';


@Component({
  selector: '[app-formations]',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})


export class FormationsComponent implements OnInit {

  public formations:FormationDoctorale[] = []; 

  getSliderClass(first,last,isEven,isOdd){
    return {
      active : first,
      lastactive : last,
      even : isEven,
      odd : isOdd
  }
  }
  
  @Input() public formation!:FormationDoctorale;


  constructor(private _httpService:HttpService) { }

  ngOnInit(): void {
     
this._httpService.getForms().then(res=>{
   
  this.formations = res.results;

 

})

  }


}
