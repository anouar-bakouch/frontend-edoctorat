import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
            console.log(data);
          },
        });
    });
  }
}
