import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BacOption } from 'src/app/enums/BacOption';
import { CIOption } from 'src/app/enums/CIOption';
import { DiplomeType } from 'src/app/enums/DiplomeType';
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


 public mentions = Object.keys(MentionEnum).map((name) => {
  return {
    name,
    value: MentionEnum[name as keyof typeof MentionEnum],
  };
});

 public TypeBac = Object.keys(BacOption).map((name) => {
  return {
    name,
    value: BacOption[name as keyof typeof BacOption],
  };
});

 public TypeDut = Object.keys(DutOption).map((name) => {
  return {
    name,
    value: DutOption[name as keyof typeof DutOption],
  };
});

  public TypesCI = Object.keys(CIOption).map((name) => {
    return {
      name,
      value: CIOption[name as keyof typeof CIOption],
    };
  });

  public TypesDiplomes = Object.keys(DiplomeType).map((name) => {
    return {
      name,
      value: DiplomeType[name as keyof typeof DiplomeType],
    };
  });
  

    


      
  

}
