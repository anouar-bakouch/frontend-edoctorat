import { Component, OnInit } from '@angular/core';
import { Sujet } from 'src/app/models/Sujet';
import { PoleSujetService } from '../../services/pole-sujet.service';

@Component({
  selector: 'app-pole-sujet',
  templateUrl: './pole-sujet.component.html',
  styleUrls: ['./pole-sujet.component.css']
})

export class PoleSujetComponent implements OnInit {


  public Psujets : Sujet [] = [];

  constructor(public poleS : PoleSujetService) { }

  ngOnInit(): void {
    this.getPoleSubjects();
  }

  public getPoleSubjects(){
    this.poleS.fetchPoleSujets()
    .then(x=>{
      
      this.Psujets = x.results;
      
      
    }
      )
    .catch()
  }

}
