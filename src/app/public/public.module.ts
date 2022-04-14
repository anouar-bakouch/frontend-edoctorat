import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { CedComponent } from './ced/ced.component';
import { ConseilsComponent } from './conseils/conseils.component';
import { FooterComponent } from './footer/footer.component';
import { FormationsComponent } from './formations/formations.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LaboratoiresComponent } from './laboratoires/laboratoires.component';
import { MainComponent } from './main/main.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HttpService } from './services/http.service';
import { PublicRoutingModule } from './public-routing.module';
import { ConnexionComponent } from './components/auth/connexion/connexion.component';
import { CandidatLoginComponent } from './components/auth/candidat-login/candidat-login.component';
import { CandidatPreRegisterComponent } from './components/auth/candidat-pre-register/candidat-pre-register.component';
import { CandidatRegisterComponent } from './components/auth/candidat-register/candidat-register.component';

@NgModule({
  declarations: [
    CalendrierComponent,
    CedComponent,
    ConseilsComponent,
    FooterComponent,
    FormationsComponent,
    HeaderComponent,
    HomeComponent,
    LaboratoiresComponent,
    MainComponent,
    WelcomeComponent,
    ConnexionComponent,
    CandidatLoginComponent,
    CandidatPreRegisterComponent,
    CandidatRegisterComponent,
  ],
  imports: [CommonModule, PublicRoutingModule, ReactiveFormsModule],
  exports: [HomeComponent],
  providers: [HttpService],
})
export class PublicModule {}
