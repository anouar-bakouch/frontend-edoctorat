import { Component, OnInit } from '@angular/core';
import { Postuler } from 'src/app/models/Postuler';
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
  public message:string = 'aucun sujet n\'est choisi pour le moment,les sujets choisies vont apparaitre ici';
  public NoSujets:boolean = false; 

  constructor(public candidat:CandidatPostulerService) {}

  ngOnInit(): void {

    this.candidat.getSelectedSubjects().subscribe(res=>{
      
    this.sujets = res.results;

    if(this.sujets.length <= 0) this.NoSujets = ! this.NoSujets;

    })

  }

  public delete(s:Postuler){

    this.candidat.deletePostule(s.id).then(x=>{

      if(x){
        const index = this.sujets.indexOf(s);
        this.sujets.splice(index,1);

          this.alert = {
            type: 'loading',
            message: "supprimé avec succès",
          }
  
      } 
      else{

        alert('yes')
       
          this.alert = {
            type: 'loading',
            message: "error lors de la suppression",
          };

      }
    
    }).then(()=>{
      setTimeout(() => (this.alert = undefined), 3000);
    })
  }





}
