import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diplome } from 'src/app/models/Diplome';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CandidatParcoursService {

  constructor(public http:HttpClient) { }

  //http://129.151.236.119/api/candidat-parcours/

  //bac


  addDiplome(diplome:Diplome):Promise<Diplome> {
    return new Promise((resolve, reject) => {
      this.http
        .post<Diplome>(`${environment.API_URL}/api/candidat-parcours/`, diplome)
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

  updateDiplome(diplome:Diplome):Promise<Diplome> {
    return new Promise((resolve, reject) => {
      this.http
        .put<Diplome>(`${environment.API_URL}/api/candidat-parcours/${diplome.idDiplome}`, diplome)
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

   deleteDiplome(diplome:Diplome):Observable<Diplome>{
     return this.http.delete<Diplome>(`${environment.API_URL}/api/candidat-parcours/${diplome.idDiplome}`);
   }




}
