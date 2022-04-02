import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public language!:string;

  constructor() { }

  ngOnInit(): void {
    this.language = localStorage.getItem('language') || 'Fr';
  }

public changeLanguage(event:any){
  
  let language = event.target.value;

  localStorage.setItem('lang',language);

}


}
