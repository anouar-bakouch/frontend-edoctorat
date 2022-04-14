import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import PreRegistration from 'src/app/models/PreRegistration';
import { RegisterService } from 'src/app/public/services/auth/register.service';

@Component({
  selector: 'app-candidat-register',
  templateUrl: './candidat-register.component.html',
  styleUrls: ['./candidat-register.component.css'],
})
export class CandidatRegisterComponent {
  isVerifyingToken = true;
  showTokenInvalid = false;
  preRegData: PreRegistration | undefined;
  form = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    activeRoute: ActivatedRoute,
    private registerService: RegisterService
  ) {
    activeRoute.queryParams.subscribe({
      next: (params) => {
        const token: string | undefined | null = params['token'];
        if (!token) {
          this.showTokenInvalid = true;
          return;
        }
        registerService.verifyToken(token).subscribe({
          next: (data) => {
            this.preRegData = data;
          },
          error: (err: HttpErrorResponse) => {
            this.showTokenInvalid = true;
            this.isVerifyingToken = false;
          },
          complete: () => {
            this.isVerifyingToken = false;
          },
        });
      },
    });
  }
}
