import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class LaboSujet {


  constructor(private http: HttpClient) { }

  //fetch data

  getSubjects(
    offset: number | undefined = undefined
  ): Promise<Result<Sujet>> {
    let url = `${environment.API_URL}/api/sujetslabo/`;
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


  // post 

  public addSujet(sujet: object) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + '/api/sujetslabo/', sujet).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  // delete 

  public deleteSujet(id:number) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(environment.API_URL + '/api/sujetslabo/' +id + '/')
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

  // update 

  public updateSujet(sujet: object, id: number) {
    return new Promise((resolve, reject) => {
      this.http
        .put(environment.API_URL + '/api/sujetslabo/' + id + '/', sujet)
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