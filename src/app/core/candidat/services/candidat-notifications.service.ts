import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CandidatNotificationsService {

  constructor(public http: HttpClient) {}

  getPublishedSubjects(
    offset: number | undefined = undefined
  ): Promise<Result<Sujet>> {
    let url = `${environment.API_URL}/api/get-candidat-notifications/`;
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
