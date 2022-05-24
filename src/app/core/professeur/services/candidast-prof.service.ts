import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CandidastProfService {

  constructor(private http: HttpClient) {}

  public getCandidats() {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.API_URL +  '/api/get-professeur-candidats/')
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
