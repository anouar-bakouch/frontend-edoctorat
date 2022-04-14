import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PreRegisterService {
  constructor(private httpClient: HttpClient) {}

  makeConfirmationEmailRequest(email: string, nom: string, prenom: string) {
    return this.httpClient.post(`${environment.API_URL}/api/confirm-email/`, {
      email,
      nom,
      prenom,
      origin: `${window.origin}/connexion/candidat/register`,
    });
  }
}
