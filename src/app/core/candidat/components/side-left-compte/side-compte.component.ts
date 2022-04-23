import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import UserInfo from 'src/app/models/UserInfo';
import { environment } from 'src/environments/environment';

@Component({
  selector: '[app-side-compte]',
  templateUrl: './side-compte.component.html',
  styleUrls: ['./side-compte.component.css'],
})
export class SideCompteComponent implements OnInit {
  public candidatInfo!: UserInfo;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUserSubjet
      .pipe(filter((u) => u != undefined))
      .subscribe((uinfo) => {
        this.candidatInfo = uinfo!;
        this.candidatInfo.pathPhoto = `${environment.API_URL}${this.candidatInfo.pathPhoto}`
      });
  }
}
