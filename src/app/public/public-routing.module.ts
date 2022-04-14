import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatLoginComponent } from './components/auth/candidat-login/candidat-login.component';
import { CandidatPreRegisterComponent } from './components/auth/candidat-pre-register/candidat-pre-register.component';
import { CandidatRegisterComponent } from './components/auth/candidat-register/candidat-register.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { ContainerComponent } from './components/container/container.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [

  
  { path : 'home' , redirectTo : 'home/infos',pathMatch : 'full'},
  
  { path : 'home' , component : ContainerComponent , children: [
     
    { path : 'infos' , component : MainComponent},

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

  ]},

  

 
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
