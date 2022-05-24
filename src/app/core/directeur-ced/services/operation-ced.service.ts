import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commission } from 'src/app/models/Commission';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationCedService {

  constructor(private http: HttpClient) {}

  public getFormationDoctorales() {
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.API_URL + '/api/formation-doctorale/')
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

  public getProfesseurs() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + '/api/get-professeurs/').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public getSujets( offset: number | undefined = undefined
    ): Promise<Result<Sujet>> {
      let url = `${environment.API_URL}/api/get-ced-sujets/`;
      if (offset) {
        url = `${url}?limit=50&offset=${offset}`;
      }
      return new Promise((resolve, reject) => {
        this.http.get<Result<Sujet>>(url).subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => reject(err),
        });
      });
    }

  

    
  public getCommissions() {
    return new Promise<Result<Commission>>((resolve, reject) => {
      this.http.get<Result<Commission>>(environment.API_URL + '/api/get-ced-commissions/').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public getResultats(offset: number | undefined = undefined) {
    let url = `${environment.API_URL}/api/get-ced-resultats/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe({
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
