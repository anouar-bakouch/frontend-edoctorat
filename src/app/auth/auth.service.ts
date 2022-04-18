import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import AuthProf from '../models/AuthProf';
import Token from '../models/Token';
import UserInfo from '../models/UserInfo';
import {
  REFRESH_TOKEN_KEY,
  STATUS_AUTH_OK,
  TOKEN_INSERT_DATE_TIME,
  TOKEN_KEY,
  USER_INFO,
} from '../utils/constants';
import { getDaysDelta } from '../utils/date';

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
              this.getUserInfo(data_.access)
                .then((_) => {
                  reslove_(STATUS_AUTH_OK);
                })
                .catch((_) => {
                  reject(
                    "Une erreur inconnue s'est produite de notre part. Essayez de vous connecter plus tard"
                  );
                });
            }
          },
        });
    });
  }

  loginProfessor(idToken: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<AuthProf>(`${environment.API_URL}/api/verify-is-prof/`, {
          token: idToken,
        })
        .subscribe({
          next: (authData: AuthProf) => {
            this.storeTokens(authData.access, authData.refresh);
            const userInfo: UserInfo = {
              email: authData.email,
              groups: authData.groups,
              nom: authData.nom,
              prenom: authData.prenom,
              pathPhoto: authData.pathPhoto,
            };
            this.saveUserInfo(userInfo);
            resolve(true);
          },
          error: (_) => reject(false),
        });
    });
  }

  private getUserInfo(accessToken: string) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<UserInfo>(`${environment.API_URL}/api/get-user-info/`, {
          headers: new HttpHeaders({ Authorization: `Bearer ${accessToken}` }),
        })
        .subscribe({
          next: (userInfo) => {
            this.saveUserInfo(userInfo);
            resolve(true);
          },
          error: (_) => {
            reject(false);
          },
        });
    });
  }
  public refreshAuthToken() {
    const rtk = this.getRefreshToken();
    return this.httpClient.post(`${environment.API_URL}/api/token/refresh/`, {
      refresh: rtk,
    });
  }
  public getLasTokenInsertDate() 
  public storeTokens(token: string, refreshToken: string | undefined) {
    window.localStorage.setItem(TOKEN_KEY, token);
    refreshToken &&
      window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    refreshToken &&
      window.localStorage.setItem(
        TOKEN_INSERT_DATE_TIME,
        new Date().toString()
      );
  }
  public getAuthToken(): string | undefined | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  public getRefreshToken(): string | undefined | null {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  public saveUserInfo(info: UserInfo) {
    window.localStorage.setItem(USER_INFO, JSON.stringify(info));
  }
  public logOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(USER_INFO);
  }
  public checkIfTokenIsOld() {
    const lastTkInsert = window.localStorage.getItem(TOKEN_INSERT_DATE_TIME);
    if (!lastTkInsert) return true;
    const days = Math.abs(getDaysDelta(Date.parse(lastTkInsert), new Date()));
    if (days > 0) return true;
    return false
  }
  public userLoggedInAndInGroup(group: string): boolean {
    const isTokenOld = this.checkIfTokenIsOld()
    if (isTokenOld) return false
    const user: object | UserInfo = JSON.parse(
      window.localStorage.getItem(USER_INFO) ?? '{}'
    );
    if (Object.keys(user).length === 0) return false;
    if (!(user as UserInfo).groups) return false;
    if ((user as UserInfo).groups.indexOf(group) <= -1) return false;
    return true;
  }
}
