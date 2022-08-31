import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Calendrier } from 'src/app/models/Calendrier';
import Result from 'src/app/models/Result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  constructor(public http:HttpClient) { }

  getCalenders(): Promise<Result<Calendrier>> {
    let url = `${environment.API_URL}/api/get-calendrier/`;
    return new Promise((resolve, reject) => {
      this.http.get<Result<Calendrier>>(url)
      .pipe(first())
      .subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);alert(err);
        }
      });
    });
  }
}
