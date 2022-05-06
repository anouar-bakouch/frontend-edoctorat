import { Component, OnInit } from '@angular/core';
import { DiplomeType } from 'src/app/enums/DiplomeType';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CandidatService } from '../../services/candidat.service';
import { Diplome } from 'src/app/models/Diplome';
import { finalize } from 'rxjs';

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
  public parcoursNotCompleted = this.parcours.filter(x=>{
    x.value = DiplomeType.BAC;
  })


  verifyParcours(){
    
  }

  constructor(
    public candidatService :CandidatService,
    private candidatParcours: CandidatParcoursService) { }

  public diplomes: Diplome [] = [];
  public progressBarvalue:number = 0;
  public OtherDiplomes:boolean = false;

  public bac_1 = 4;
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
                  this.bac_1 = this.bac_1 + 16;
                  console.log('bac')
          break;

          case DiplomeType.DUT : 
                   this.bac_2 = this.bac_2 + 16;
                  console.log('dut')

          break;

          case DiplomeType.CI || DiplomeType.MASTER || DiplomeType.MASTER_SPECIALISE || DiplomeType.MASTER_EN_SCIENCE_TECHNIQUE : 
                   this.bac_5 = this.bac_5 + 16;
                  console.log('ci')

          break;


          case DiplomeType.LICENCE || DiplomeType.LICENCE_PROFESSIONNELLE : 
                   this.bac_3 = this.bac_3 + 16;
                  console.log('licence')

          break;

          case DiplomeType.DOCTORATE_EN_MEDICINE : 
                   this.bac_6 = this.bac_6 + 16;
          break;

          default : 
                  this.progressBarvalue = 0;
          break;

        }
    

      }
    
      )
      this.progressBarvalue = this.bac_1+ this.bac_2 + this.bac_6 + this.bac_5 + this.bac_3;
      if(this.progressBarvalue === 100){
        this.SuccessParcours = ! this.SuccessParcours;
      }
    })
  }

}
