import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import AuthProf from '../models/AuthProf';
import Token from '../models/Token';
import UserInfo from '../models/UserInfo';
import { STATUS_AUTH_OK, USER_INFO } from '../utils/constants';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  loginCandidat(email: string, password: string): Promise<any> {
    this.logOut();
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
            this.tokenStorage.storeTokens(data.access, data.refresh);
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
    this.logOut();
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<AuthProf>(`${environment.API_URL}/api/verify-is-prof/`, {
          token: idToken,
        })
        .subscribe({
          next: (authData: AuthProf) => {
            this.tokenStorage.storeTokens(authData.access, authData.refresh);
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
    const rtk = this.tokenStorage.getRefreshToken();
    return this.httpClient.post(`${environment.API_URL}/api/token/refresh/`, {
      refresh: rtk,
    });
  }

  public saveUserInfo(info: UserInfo) {
    window.localStorage.setItem(USER_INFO, JSON.stringify(info));
  }

  public logOut() {
    this.tokenStorage.clearTokens();
    window.localStorage.removeItem(USER_INFO);
  }

  public userLoggedInAndInGroup(group: string): boolean {
    const isTokenOld = this.tokenStorage.checkIfTokenIsOld();
    if (isTokenOld) {
      this.logOut();
      return false;
    }
    const user: object | UserInfo = JSON.parse(
      window.localStorage.getItem(USER_INFO) ?? '{}'
    );
    if (Object.keys(user).length === 0) {
      this.logOut();
      return false;
    }
    if (!(user as UserInfo).groups) {
      this.logOut();
      return false;
    }
    if ((user as UserInfo).groups.indexOf(group) <= -1) {
      this.logOut();
      return false;
    }
    return true;
  }
}
