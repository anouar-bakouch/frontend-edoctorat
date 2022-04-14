import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatLoginComponent } from './components/auth/candidat-login/candidat-login.component';
import { ConnexionComponent } from './components/auth/connexion/connexion.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'connexion/candidat/login', component: CandidatLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
