import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendrier } from 'src/app/models/Calendrier';
import { FormationDoctorale } from 'src/app/models/FormationDoctorale';
import { Laboratoire } from 'src/app/models/Laboratoire';


@Injectable()

export class HttpService {

  private _url:string = 'https://62421b72d126926d0c4e2cc8.mockapi.io';

  constructor(private http:HttpClient) { }

  public getFormationsDoctorale():Observable<Array<FormationDoctorale>>{
      
    return this.http.get<Array<FormationDoctorale>>(`${this._url}/formationDoctorale`);

  }
   
  public getLaboratoires():Observable<Array<Laboratoire>>{

   return this.http.get<Array<Laboratoire>>(`${this._url}/laboratoire`);

  }

  public getCalendrierDoctorant():Observable<Calendrier>{

    return this.http.get<Calendrier>(`${this._url}/calendrierDoctorant`);

  }

  public getCalendrierProfesseur():Observable<Calendrier>{

    return this.http.get<Calendrier>(`${this._url}/calendrierProfesseur`);

  }

 

}
