import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: '[app-side-compte]',
  templateUrl: './side-compte.component.html',
  styleUrls: ['./side-compte.component.css']
})

export class SideCompteComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
/*
  public postuler(){
    this.router.navigate(['../postuler'],{ relativeTo : this.router})
  }

  public infoPerso(){
    this.router.navigate(['../info_personnels'],{relativeTo : this.router})
  }
*/

}
