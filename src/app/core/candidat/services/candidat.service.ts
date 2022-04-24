import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
