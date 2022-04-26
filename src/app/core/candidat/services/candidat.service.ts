import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BacOption } from 'src/app/enums/BacOption';
import { CIOption } from 'src/app/enums/CIOption';
import { DutOption } from 'src/app/enums/DutOption';
import { MentionEnum } from 'src/app/enums/MentionEnum';
import { Candidat } from 'src/app/models/Candidat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class CandidatService {
  constructor(private httpClient: HttpClient) {}

  getCandidatInfo(): Promise<Candidat> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<Candidat>(`${environment.API_URL}/api/candidat-info/`)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => reject(err),
        });
    });
  }

  updateCandidatInfo(candidat: any): Promise<Candidat> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put<Candidat>(`${environment.API_URL}/api/candidat-info/`, candidat)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  public mentions = [MentionEnum.P,MentionEnum.AB,MentionEnum.B,MentionEnum.TB,MentionEnum.E];

  public TypeBac:BacOption [] = [
                    BacOption.arA,
                    BacOption.sA,
                    BacOption.sE,
                    BacOption.sH,
                    BacOption.scA,
                    BacOption.scB,
                    BacOption.slA,
                    BacOption.slC,
                    BacOption.spC,
                    BacOption.stE,
                    BacOption.stM,
                    BacOption.svT,
                    BacOption.tgC
                  ];
        
  public TypeDut:DutOption [] = [ 
                    DutOption.BPA,
                    DutOption.BTP,
                    DutOption.CEG,
                    DutOption.CJ,
                    DutOption.CPM,
                    DutOption.DCE,
                    DutOption.DEA,
                    DutOption.DEC,
                    DutOption.DI,
                    DutOption.EE,
                    DutOption.GACO,
                    DutOption.GB,
                    DutOption.GBOA,
                    DutOption.GCCD,
                    DutOption.GCGP,
                    DutOption.GEII,
                    DutOption.GI,
                    DutOption.GLT,
                    DutOption.GIM,
                    DutOption.GMP,
                    DutOption.GTE,
                    DutOption.HSE,
                    DutOption.MP,
                    DutOption.IQ,
                    DutOption.PEC,
                    DutOption.QLIO,
                    DutOption.RT,
                    DutOption.SGM,
                    DutOption.STID,
                    DutOption.TC
  ];                 

  public TypesCI = [
                   CIOption.E2I,
                   CIOption.G2E,
                   CIOption.GAi,
                   CIOption.GC,
                   CIOption.GEA,
                   CIOption.GEEI,
                   CIOption.GI,
                   CIOption.GIL,
                   CIOption.GInf,
                   CIOption.GLT,
                   CIOption.GM,
                   CIOption.GMi,
                   CIOption.GPEE,
                   CIOption.GPM,
                   CIOption.GSE,
                   CIOption.GST,
                   CIOption.GTR,
                   CIOption.Ge,
                   CIOption.Gme,
                   CIOption.Gmul,
                   CIOption.IG,
                   CIOption.If,
                   CIOption.MIAGE,
                   CIOption.MT
  ];



      
  

}
