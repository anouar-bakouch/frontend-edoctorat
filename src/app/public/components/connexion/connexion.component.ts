import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import AuthUser from 'src/app/models/GoogleAuthUser';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  constructor(private socialAuthService: SocialAuthService) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: AuthUser) => {
      console.log(JSON.stringify(user));
    });
  }

  public loginProf() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
