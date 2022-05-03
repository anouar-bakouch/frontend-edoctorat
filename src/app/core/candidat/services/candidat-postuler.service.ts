import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import Result from 'src/app/models/Result';
import { Sujet } from 'src/app/models/Sujet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidatPostulerService {
  constructor(public http: HttpClient) {}

  getPublishedSubjects(
    offset: number | undefined = undefined
  ): Promise<Result<Sujet>> {
    let url = `${environment.API_URL}/api/get-published-subjects/`;
    if (offset) {
      url = `${url}?limit=50&offset=${offset}`;
    }
    return new Promise((resolve, reject) => {
      this.http.get<Result<Sujet>>(url).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => reject(err),
      });
    });
  }
}
