import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatLoginComponent } from './components/auth/candidat-login/candidat-login.component';
import { CandidatPreRegisterComponent } from './components/auth/candidat-pre-register/candidat-pre-register.component';
import { CandidatRegisterComponent } from './components/auth/candidat-register/candidat-register.component';
import { ConnexionComponent } from './components/home_page/connexion/connexion.component';


const routes: Routes = [

  { path: 'connexion', component: ConnexionComponent , children : [

    { path: 'candidat/login/', component: CandidatLoginComponent },

    {
      path: 'candidat/pre-register',
      component: CandidatPreRegisterComponent,
    },
    
    {
      path: 'candidat/register',
      component: CandidatRegisterComponent,
    }


  ] }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
