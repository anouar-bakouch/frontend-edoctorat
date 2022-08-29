import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calendrier } from 'src/app/models/Calendrier';
import Result from 'src/app/models/Result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  constructor(public http:HttpClient) { }

  getNotifications(): Promise<Result<Calendrier>> {
    let url = `${environment.API_URL}/api/get-candidat-notifications/`;
    return new Promise((resolve, reject) => {
      this.http.get<Result<Calendrier>>(url)
      .subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => reject(err),
      });
    });
  }
}
