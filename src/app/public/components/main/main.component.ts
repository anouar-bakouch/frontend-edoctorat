import { Component, OnInit } from '@angular/core';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Laboratoire } from 'src/app/models/Laboratoire';
import { HttpService } from 'src/app/public/services/http.service';


@Component({
  selector: '[app-main]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  public laboratoires:Array<Laboratoire> = [];
  public formations:Array<FormationDoctorale> = [];
  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.http.getLaboratoires().subscribe(
      res=>{
        this.laboratoires = res;
      }
    )

    this.http.getFormationsDoctorale().subscribe(
      res =>{
        this.formations = res;
      }
    )

  }



}
