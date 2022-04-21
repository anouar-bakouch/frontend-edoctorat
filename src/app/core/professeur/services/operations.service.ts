import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import { Sujet } from 'src/app/models/Sujet';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'   // this is our token from the UserService (see Part 1)
    })
  };
  // normally we need to get sujets by id of prof
  // http://127.0.0.1:8000/api/professeurs/id_professeur
  // private _url: string = 'http://127.0.0.1:8000/api/professeurs/1';
  private _url: string = 'http://129.151.236.119/api/sujets/';

  constructor(private http: HttpClient) { }

  public getFormationDoctorales(): Observable<FormationDoctorale[]> {
    let _url = 'http://127.0.0.1:8000/api/formation-doctorale/';
    return this.http.get<FormationDoctorale[]>(_url);

  }

  public getProfesseurs(): Observable<Professeur[]> {
    let _url = 'http://129.151.236.119/api/professeurs/';
    return this.http.get<Professeur[]>(_url);

  }
  public getProfesseur(id: Professeur): Observable<Professeur> {
    let _url = `'http://129.151.236.119/api/professeurs/${id}/`;
    return this.http.get<Professeur>(_url);

  }
  public getformDoct(id: FormationDoctorale): Observable<FormationDoctorale> {
    let _url = `http://127.0.0.1:8000/api/formation-doctorale/${id}/`;
    return this.http.get<FormationDoctorale>(_url);

  }

  
  public getSujets(): Observable<Sujet[]> {

    return this.http.get<Sujet[]>(this._url);

  }


  public addSujet(sujet: Sujet): Observable<Sujet> {
    let header = new HttpHeaders().set(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwMzAzOTAyLCJpYXQiOjE2NTAzMDAzMDIsImp0aSI6IjA5YTVlNDI0ZmVmYjQyZmViMzNlM2Q5MzQ3ZTIyZDJjIiwidXNlcl9pZCI6MX0.Yp0wi_gkzCwyWARWKazN7d_ARu0bBngGHP_bCXVK0h8"
    );
    let _url: string = 'http://129.151.236.119/api/sujets/';
    return this.http.post<Sujet>(_url, sujet, { headers: header });

  }

  public deleteSujet(sujet: Sujet): Observable<Sujet> {
    return this.http.delete<Sujet>(this._url + '/' + sujet.id + '/');

  }

  public updateSujet(sujet: Sujet): Observable<Sujet> {
    return this.http.put<Sujet>(this._url + '/' + sujet.id + '/', sujet);

  }


}
