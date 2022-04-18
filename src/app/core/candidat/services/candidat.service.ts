import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { CandidatModule } from '../candidat.module';

@Injectable({
  providedIn: 'root',
})
export class CandidatService {
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  getCandidatInfo(): Observable<CandidatModule> {
    return this.httpClient.get<CandidatModule>(
      `${environment.API_URL}/api/candidat-info/`
    );
  }
}
