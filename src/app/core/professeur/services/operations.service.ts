import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Professeur } from 'src/app/models/Professeur';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {


  private _url: string = 'http://129.151.236.119';
  // private _url: string = 'http://127.0.0.1:8000';
  // private _url2:string = 'http://127.0.0.1:8000';
  private _url2: string = 'http://129.151.236.119';
  constructor(private http: HttpClient) { }

  public getFormationDoctorales(): Observable<Result<FormationDoctorale>> {
    // let _url = 'http://127.0.0.1:8000/api/formation-doctorale/';
    return this.http.get<Result<FormationDoctorale>>(this._url + '/api/formation-doctorale/');

  }

  public getProfesseurs(): Observable<Result<Professeur>> {
    
    return this.http.get<Result<Professeur>>(this._url2 +'/api/get-professeurs/');

  }
  public getProfesseur(id: Professeur): Observable<Professeur> {
    return this.http.get<Professeur>(this._url2 +`/api/get-professeurs/${id}/`);

  }
  public getformDoct(id: FormationDoctorale): Observable<FormationDoctorale> {
    return this.http.get<FormationDoctorale>(this._url2 +`/api/formation-doctorale/${id}/`);

  }
  public getSujets(): Observable<Result<Sujet>> {

    return this.http.get<Result<Sujet>>(this._url +'/api/sujets/');

  }

  public addSujet(sujet: JSON): Observable<Sujet> {
    return this.http.post<Sujet>(this._url + '/api/sujets/', sujet);

  }

  public deleteSujet(sujet: Sujet): Observable<Sujet> {
    console.log(sujet)
    return this.http.delete<Sujet>(this._url + '/api/sujets/' + sujet.id + '/');

  }

  public updateSujet(sujet: JSON, id:number): Observable<Sujet> {
    return this.http.put<Sujet>(this._url + '/api/sujets/' + id + '/', sujet);

  }


}
