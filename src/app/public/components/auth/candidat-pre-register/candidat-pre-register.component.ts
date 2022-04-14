import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PreRegisterService } from 'src/app/public/services/auth/pre-register.service';

@Component({
  selector: 'app-candidat-pre-register',
  templateUrl: './candidat-pre-register.component.html',
  styleUrls: ['./candidat-pre-register.component.css'],
})
export class CandidatPreRegisterComponent {
  constructor(private service: PreRegisterService) {}

  showEmailConfMsg = false;
  showError = false;
  showLoading = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.showError = false;
    this.showLoading = true;
    this.service
      .makeConfirmationEmailRequest(
        this.form.get('email')!.value,
        this.form.get('nom')!.value,
        this.form.get('prenom')!.value
      )
      .subscribe({
        next: (data) => {
          this.showEmailConfMsg = true;
        },
        error: (error: HttpErrorResponse) => {
          this.showError = true;
        },
        complete: () => (this.showLoading = false),
      });
  }
}
