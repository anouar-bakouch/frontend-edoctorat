import { Component, OnInit } from '@angular/core';
import { DiplomeType } from 'src/app/enums/DiplomeType';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CandidatService } from '../../services/candidat.service';
import { Diplome } from 'src/app/models/Diplome';
import swal from 'sweetalert';

@Component({
  selector: '[app-parcours]',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.css']
})
export class ParcoursComponent implements OnInit {

  public parcours:{
    name: string;
    value: DiplomeType;
}[] = [];

  public message:string = 'votre dossier est incomplet , veuillez completer votre dossier';

  public parcoursNotCompleted = this.parcours.filter(x=>{
    x.value = DiplomeType.BAC;
  })


  constructor(
    public candidatService :CandidatService,
    private candidatParcours: CandidatParcoursService) { }

  public diplomes: Diplome [] = [];
  public progressBarvalue:number = 0;
  public OtherDiplomes:boolean = false;

  public bac_1 = 0;
  public bac_2 = 0;
  public bac_3 = 0;
  public bac_5 = 0;
  public bac_6 = 0;

  public SuccessParcours = false;

  ngOnInit(): void {

    this.parcours = this.candidatService.TypesDiplomes;

    this.candidatParcours.getInfoDiplomes().then(res=>{
      this.diplomes = res.results;

      this.diplomes.forEach(x=>{
        
        switch(x.intitule){

          case DiplomeType.BAC :
                  this.bac_1 = this.bac_1 + 20;
          break;

          case DiplomeType.DUT || DiplomeType.BTS || DiplomeType.DTS || DiplomeType.DEUG || DiplomeType.DEUST: 
                   this.bac_2 = this.bac_2 + 20;

          break;

          case DiplomeType.CI || DiplomeType.MASTER || DiplomeType.MASTER_SPECIALISE || DiplomeType.MASTER_EN_SCIENCE_TECHNIQUE : 
                   this.bac_5 = this.bac_5 + 60;

          break;

          case DiplomeType.LICENCE || DiplomeType.LICENCE_PROFESSIONNELLE : 
                   this.bac_3 = this.bac_3 + 20;

          break;

          case DiplomeType.DOCTORATE_EN_MEDICINE : 
                   this.bac_6 = this.bac_6 + 80;
          break;

          default : 
                  this.progressBarvalue = 0;
          break;

        }
    

      }
    
      )
 

      const result:number = this.bac_1+ this.bac_2 + this.bac_3 + this.bac_5 + this.bac_6 ;
      if(result === 80 || result === 60 || result === 100 ||  result >= 120){
        this.SuccessParcours = ! this.SuccessParcours;
        this.progressBarvalue = 100;
        this.message = 'félicitations votre dossier est complet !';
        swal({
          icon: 'success',
         text : this.message
        });

      
      }
      else {
        this.progressBarvalue = result;
      }
    })
  }

}
