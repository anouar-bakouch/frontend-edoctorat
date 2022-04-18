import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private authService: AuthService) {
    
   }
}
