import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/models/Postuler';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { CandidatPostulerService } from '../../services/candidat-postuler.service';
import { AlertData } from 'src/app/shared/components/alert/alert.component';


@Component({
  selector: '[app-sujers]',
  templateUrl: './sujers.component.html',
  styleUrls: ['./sujers.component.css']
})

export class SujersComponent implements OnInit {

  public sujets:Postuler[] = [];
  public alert: AlertData | undefined = undefined;

  constructor(public candidat:CandidatPostulerService) {}

  ngOnInit(): void {

    this.candidat.getSelectedSubjects().subscribe(res=>{
      
    this.sujets = res.results;

    })

  }

  public delete(s:Postuler){

    this.candidat.deletePostule(s.id).then(x=>{
      if(x){
        const index = this.sujets.indexOf(s);
        this.sujets.splice(index,1);
        setTimeout(()=>{
          this.alert = {
            type: 'loading',
            message: "supprimé avec succès",
          };
        },1000)
      } 
      else {
      
        setTimeout(()=>{
          this.alert = {
            type: 'loading',
            message: "error lors de la suppression",
          };
        },1000)
      }
    })
  }





}
