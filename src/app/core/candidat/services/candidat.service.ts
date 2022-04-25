import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BacOption } from 'src/app/enums/BacOption';
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

  public TypeBac = [BacOption.arA,
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
                  ]
      
  

}
