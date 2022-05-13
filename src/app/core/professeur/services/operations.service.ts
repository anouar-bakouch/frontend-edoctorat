import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Commission } from 'src/app/models/Commission';
import { Examiner } from 'src/app/models/Examiner';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Inscription } from 'src/app/models/Inscription';
import { Participe } from 'src/app/models/Participe';
import { Professeur } from 'src/app/models/Professeur';
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
      this.http.get(
        environment.API_URL + '/api/formation-doctorale/'
      ).subscribe(
        {
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        }
      )
    })
    
  }

  public getProfesseurs(){
    return new Promise((resolve, reject) => {
      this.http.get(
        environment.API_URL + '/api/get-professeurs/'
      ).subscribe(
        {
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        }
      )
    })
    
  }
  // public getProfesseur(id: Professeur): Observable<Professeur> {
  //   return this.http.get<Professeur>(
  //     environment.API_URL + `/api/get-professeurs/${id}/`
  //   );
  // }
  // public getformDoct(id: FormationDoctorale): Observable<FormationDoctorale> {
  //   return this.http.get<FormationDoctorale>(
  //     environment.API_URL + `/api/formation-doctorale/${id}/`
  //   );
  // }
  public getSujets(){
    return new Promise((resolve, reject) => {
      this.http.get(environment.API_URL + '/api/sujets/').subscribe(
        {
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        }
      )
    })
    
  }
  public getSujet(id: number): Observable<Sujet> {
    return this.http.get<Sujet>(
      environment.API_URL + '/api/sujets/' + id + '/'
    );
  }

  // public addSujet(sujet: object): Observable<Sujet> {
  //   return this.http.post<Sujet>(environment.API_URL + '/api/sujets/', sujet);
  // }
  public addSujet(sujet: object) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.API_URL + '/api/sujets/', sujet).subscribe(
        {
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        }
      )
    })
  }

  // public deleteSujet(sujet: Sujet): Observable<Sujet> {
  //   console.log(sujet)
  //   return this.http.delete<Sujet>(environment.API_URL + '/api/sujets/' + sujet.id + '/');

  // }

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

  // public getCommissions(): Observable<Result<Commission>> {
  //   return this.http.get<Result<Commission>>(
  //     environment.API_URL + '/api/commission/'
  //   );
  // }
  public getCommissions(){
    return new Promise((resolve, reject) => {
      this.http.get(
        environment.API_URL + '/api/commission/'
      ).subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }
  // public getResultats(): Observable<Result<Examiner>> {
  //   return this.http.get<Result<Examiner>>(
  //     environment.API_URL + '/api/examiner/'
  //   );
  // }
  public getResultats(){
    return new Promise((resolve, reject) => {
      this.http.get(
        environment.API_URL + '/api/examiner/'
      ).subscribe({
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
