import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Token from '../models/Token';
import {
  REFRESH_TOKEN_KEY,
  STATUS_AUTH_OK,
  TOKEN_KEY,
} from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  loginCandidat(email: string, password: string): Promise<any> {
    let errorsOccured = false;
    let data_: Token;
    return new Promise((reslove_, reject) => {
      this.httpClient
        .post<Token>(`${environment.API_URL}/api/token/`, {
          username: email,
          password,
        })
        .subscribe({
          next: (data: Token) => {
            this.storeTokens(data.access, data.refresh);
            errorsOccured = false;
            data_ = data;
          },
          error: (err: HttpErrorResponse) => {
            errorsOccured = true;
            if (err.status === 401) {
              reject("Informations d'identification incorrectes fournies");
            } else {
              reject(
                'Vérifiez votre connexion Internet ou réessayez plus tard'
              );
            }
          },
          complete: () => {
            if (!errorsOccured) {
              reslove_(STATUS_AUTH_OK);
            }
          },
        });
    });
  }

  private storeTokens(token: string, refreshToken: string) {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  public getAuthToken(): string | undefined | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }
}
