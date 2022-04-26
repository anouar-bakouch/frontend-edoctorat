import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CandidatPostulerService {

  private _url = environment.API_URL+'/api/get-published-subjects/';

  constructor(public http:HttpClient) { }

  getPublishedSubjects():Promise<Result<Sujet>>{
    return new Promise((resolve, reject) => {
      this.http
        .get<Result<Sujet>>(this._url)
        .subscribe({
          next: (data) => {
            resolve(data);
          },
          error: (err) => reject(err),
        });
    });
  }


}
