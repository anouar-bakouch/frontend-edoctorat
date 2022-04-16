import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import AuthUser from 'src/app/models/GoogleAuthUser';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent {
  showLoading = false;
  constructor(private socialAuthService: SocialAuthService) {}

  public loginProf() {
    this.showLoading = true;
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((authUser: AuthUser) => {
        if (authUser) {
          console.log(authUser.idToken);
        }
      })
      .catch((err) => {
        this.showLoading = false;
      });
  }
}
