import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendrier } from 'src/app/models/Calendrier';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Laboratoire } from 'src/app/models/Laboratoire';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';
import Result from 'src/app/models/Result';


@Injectable({
  providedIn: 'root'
 }
)

export class HttpService {


  constructor(public http:HttpClient) { }

  getForms(): Promise<Result<FormationDoctorale>> {
    let url = `${environment.API_URL}/api/formation-doctorale/`;
    return new Promise((resolve, reject) => {
      this.http.get<Result<FormationDoctorale>>(url,{responseType : 'json'})
      .pipe(first())
      .subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => reject(err),
      });
    });
  }

  getLabos(): Promise<Result<Laboratoire>> {
    let url = `${environment.API_URL}/api/get_labo_candidat/`;
    return new Promise((resolve, reject) => {
      this.http.get<Result<Laboratoire>>(url,{responseType : 'json'})
      .pipe(first())
      .subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => reject(err),
      });
    });
  }

  

  public getCalendrierDoctorant():Observable<Calendrier>{

    return this.http.get<Calendrier>(`${environment.API_URL}/calendrierDoctorant/`);

  }

  public getCalendrierProfesseur():Observable<Calendrier>{

    return this.http.get<Calendrier>(`${environment.API_URL}/calendrierProfesseur/`);

  }

 

}
