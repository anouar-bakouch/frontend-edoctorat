import { Component, OnInit } from '@angular/core';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: '[app-parcours]',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.css']
})
export class ParcoursComponent implements OnInit {

  public parcours = this.candidatService.TypesDiplomes;;

  constructor(public candidatService :CandidatService) { }

  ngOnInit(): void {
   
  }

}
