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

  addDiplome(diplome:Diplome):Observable<Diplome>{
     return this.http.post<Diplome>(environment.API_URL+'/api/candidat-parcours/',diplome)
  }

}
