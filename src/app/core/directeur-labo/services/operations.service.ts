import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Commission } from 'src/app/models/Commission';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient) { }

  public getSujetsLabo() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + '/api/sujetslabo/').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public addCommission(comm: object) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + '/api/commission/', comm).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public updateSujet(comm: object, id: number) {
    return new Promise((resolve, reject) => {
      this.http
        .put(environment.API_URL + '/api/commission/' + id + '/', comm)
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

  public getCommissions() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + '/api/commission/').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public deleteCommission(c: Commission) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(environment.API_URL + '/api/commission/' + c.id + '/')
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
      this.http.get(environment.API_URL + '/api/labo_professeur/').subscribe({
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
