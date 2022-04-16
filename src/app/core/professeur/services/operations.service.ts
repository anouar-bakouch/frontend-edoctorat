import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sujet } from 'src/app/models/Sujet';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  private _url: string = 'http://127.0.0.1:8000/api/sujets/';

  constructor(private http:HttpClient) { }

  public getSujets():Observable<Array<Sujet>>{

    return this.http.get<Array<Sujet>>(this._url);

  }

  public addSujet(sujet:Sujet):Observable<Sujet>{

    return this.http.post<Sujet>(this._url,sujet);

  }

  public deleteSujet(sujet:Sujet):Observable<Sujet>{
    
    //still don't know what the backend needs the id or whatever 
    // i expect it will be using the id
    return this.http.delete<Sujet>(this._url+'/'+sujet.id);

  }

  public updateSujet(sujet:Sujet):Observable<Sujet>{
   
    // the same here
   return this.http.put<Sujet>(this._url+'/'+sujet.id,sujet);

  }


}
