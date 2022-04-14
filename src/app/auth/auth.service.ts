import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Token from '../models/Token';
import UserInfo from '../models/UserInfo';
import {
  REFRESH_TOKEN_KEY,
  STATUS_AUTH_OK,
  TOKEN_KEY,
  USER_INFO,
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
              this.getUserInfo(data_.access).subscribe({
                next: (info: UserInfo) => {
                  this.saveUserInfo(info);
                  reslove_(STATUS_AUTH_OK);
                },
                error: (_: HttpErrorResponse) => {
                  reject(
                    "Une erreur inconnue s'est produite de notre part. Essayez de vous connecter plus tard"
                  );
                },
              });
            }
          },
        });
    });
  }

  private getUserInfo(accessToken: string) {
    return this.httpClient.get<UserInfo>(
      `${environment.API_URL}/api/get-user-info/`,
      {
        headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
      }
    );
  }

  private storeTokens(token: string, refreshToken: string) {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  public getAuthToken(): string | undefined | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public saveUserInfo(info: UserInfo) {
    window.localStorage.setItem(USER_INFO, JSON.stringify(info));
  }
  public logOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(USER_INFO);
  }
}
