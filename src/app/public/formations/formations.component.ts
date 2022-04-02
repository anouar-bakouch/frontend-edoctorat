import { Component, Input, OnInit } from '@angular/core';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';


@Component({
  selector: '[app-formations]',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})


export class FormationsComponent implements OnInit {

 @Input() formation!:FormationDoctorale;

  constructor() { }

  ngOnInit(): void {
  }


}
