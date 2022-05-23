import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Inscription } from 'src/app/models/Inscription';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class OperationsService {
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

  public getSujets() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + '/api/sujets/').subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }
  public getSujet(id: number): Observable<Sujet> {
    return this.http.get<Sujet>(
      environment.API_URL + '/api/sujets/' + id + '/'
    );
  }

  public addSujet(sujet: object) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + '/api/sujets/', sujet).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  public deleteSujet(sujet: Sujet) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(environment.API_URL + '/api/sujets/' + sujet.id + '/')
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
  
  public updateSujet(sujet: object, id: number) {
    return new Promise((resolve, reject) => {
      this.http
        .put(environment.API_URL + '/api/sujets/' + id + '/', sujet)
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
      this.http.get(environment.API_URL + '/api/participant/').subscribe({
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
    let url = `${environment.API_URL}/api/examiner/`;
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

  public getMesInscrits(): Observable<Result<Inscription>> {
    return this.http.get<Result<Inscription>>(
      environment.API_URL + '/api/inscrits/'
    );
  }
  // public getMesInscrits(){
  //   return new Promise((resolve, reject) => {
  //     this.http.get(
  //       environment.API_URL + '/api/inscrits/'
  //     ).subscribe({
  //         next: (data) => {
  //           resolve(data);
  //         },
  //         error: (err) => {
  //           reject(err);
  //         },
  //       });
  //   });
  // }
}
