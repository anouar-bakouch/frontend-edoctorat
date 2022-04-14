import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidat-pre-register',
  templateUrl: './candidat-pre-register.component.html',
  styleUrls: ['./candidat-pre-register.component.css'],
})
export class CandidatPreRegisterComponent {
  constructor() {}
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
  })
}
