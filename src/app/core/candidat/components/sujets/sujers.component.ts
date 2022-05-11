import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/models/Postuler';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { CandidatPostulerService } from '../../services/candidat-postuler.service';

@Component({
  selector: '[app-sujers]',
  templateUrl: './sujers.component.html',
  styleUrls: ['./sujers.component.css']
})

export class SujersComponent implements OnInit {

  public sujets:Postuler[] = [];

  constructor(public candidat:CandidatPostulerService) {}

  ngOnInit(): void {

    this.candidat.getSelectedSubjects().subscribe(res=>{
      
    this.sujets = res.results;


    this.sujets.forEach(x=>{
    console.log(x)
    })

    })

  }

}
