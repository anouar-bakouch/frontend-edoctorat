import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatLoginComponent } from './components/auth/candidat-login/candidat-login.component';
import { CandidatPreRegisterComponent } from './components/auth/candidat-pre-register/candidat-pre-register.component';
import { CandidatRegisterComponent } from './components/auth/candidat-register/candidat-register.component';
import { ConnexionComponent } from './components/auth/connexion/connexion.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'connexion/candidat/login', component: CandidatLoginComponent },
  {
    path: 'connexion/candidat/pre-register',
    component: CandidatPreRegisterComponent,
  },
  {
    path: 'connexion/candidat/register',
    component: CandidatRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
