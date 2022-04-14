import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PreRegistration from 'src/app/models/PreRegistration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  verifyToken(token: string) {
    return this.httpClient.post<PreRegistration>(
      `${environment.API_URL}/api/verify-token/`,
      {
        token,
      }
    );
  }

  registerCandidat(payload: Object) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(`${environment.API_URL}/api/register/candidat/`, payload)
        .subscribe({
          next: (data) => {
            resolve('Account created successfully');
          },
          error: (err: HttpErrorResponse) => {
            reject('An error occured');
          },
        });
    });
  }
}
