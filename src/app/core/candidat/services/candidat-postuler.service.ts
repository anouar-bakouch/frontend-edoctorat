import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CandidatPostulerService {

  private _url = environment.API_URL+'/api/get-published-subjects/';

  constructor(public http:HttpClient) { }

  getPublishedSubjects(){
    
  }


}
