import { Component, Input, OnInit } from '@angular/core';
import { Laboratoire } from 'src/app/models/Laboratoire';
import { HttpService } from '../../services/http.service';

@Component({
  selector: '[app-laboratoires]',
  templateUrl: './laboratoires.component.html',
  styleUrls: ['./laboratoires.component.css']
})

export class LaboratoiresComponent implements OnInit {

  public laboratoires:Array<Laboratoire> = [];
  
  @Input() public laboratoire!:Laboratoire;

  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.http.getLaboratoires().subscribe(
      res=>{
        this.laboratoires = res;
        console.log(res)
      }
    )
  }

  



}
