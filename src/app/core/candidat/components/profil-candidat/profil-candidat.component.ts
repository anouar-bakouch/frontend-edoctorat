import { Component, OnInit } from '@angular/core';
import { Candidat } from 'src/app/models/Candidat';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: 'app-profil-candidat',
  templateUrl: './profil-candidat.component.html',
  styleUrls: ['./profil-candidat.component.css']
})
export class ProfilCandidatComponent implements OnInit {

  public candidat !:Candidat;
  public isFetchingInfo:boolean = true;
  public errorText:string = '';

  constructor(public candidatService:CandidatService) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    this.candidatService.getCandidatInfo().then(res=>{
      this.isFetchingInfo = false;
      this.candidat = res;
    })
  }

}
