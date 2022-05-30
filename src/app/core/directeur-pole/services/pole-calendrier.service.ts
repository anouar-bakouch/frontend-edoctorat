import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calendrier } from 'src/app/models/Calendrier';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoleCalendrierService {

  constructor(private client: HttpClient) { }

  fetchCalendrier(): Promise<Calendrier[]> {
    return new Promise<Calendrier[]>((resolve, reject) => {
      this.client.get<Calendrier[]>(`${environment.API_URL}/api/get-calendrier/`).subscribe({
        next: (d) => resolve(d),
        error: (_) => reject(),
      })
    });
  }
}
