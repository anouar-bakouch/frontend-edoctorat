import { Component, OnInit } from '@angular/core';
import { DiplomeType } from 'src/app/enums/DiplomeType';
import { CandidatParcoursService } from '../../services/candidat-parcours.service';
import { CandidatService } from '../../services/candidat.service';
import { Diplome } from 'src/app/models/Diplome';

@Component({
  selector: '[app-parcours]',
  templateUrl: './parcours.component.html',
  styleUrls: ['./parcours.component.css']
})
export class ParcoursComponent implements OnInit {

  public parcours = this.candidatService.TypesDiplomes;;

  constructor(
    public candidatService :CandidatService,
    private candidatParcours: CandidatParcoursService) { }

  public BacExist:boolean = false;
  public DutExist:boolean = false;
  public CIExist:boolean = false;
  public LicenceExist:boolean = false;
  public LicenceProExist:boolean = false;
  public MasterExist:boolean = false;
  public MasterSpeExist:boolean = false;
  public diplomes: Diplome [] = [];
  public progressBarvalue:string = '0';


  ngOnInit(): void {
    this.candidatParcours.getInfoDiplomes().then(res=>{
      this.diplomes = res.results;

      this.diplomes.forEach(x=>{
        if(x.intitule = DiplomeType.BAC) this.BacExist = true;
      })

    })
  }

}
