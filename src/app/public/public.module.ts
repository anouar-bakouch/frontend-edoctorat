import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendrierComponent } from './home_page/calendrier/calendrier.component';
import { CedComponent } from './home_page/ced/ced.component';
import { ConseilsComponent } from './home_page/footer/conseils/conseils.component';
import { FooterComponent } from './home_page/footer/footer.component';
import { FormationsComponent } from './home_page/formations/formations.component';
import { HeaderComponent } from './home_page/header/header.component';
import { LaboratoiresComponent } from './home_page/laboratoires/laboratoires.component';
import { MainComponent } from './home_page/main/main.component';
import { WelcomeComponent } from './home_page/welcome/welcome.component';
import { HttpService } from './services/http.service';
import { PublicRoutingModule } from './public-routing.module';
import { ConnexionComponent } from './home_page/connexion/connexion.component';
import { CandidatLoginComponent } from './components/auth/candidat-login/candidat-login.component';
import { CandidatPreRegisterComponent } from './components/auth/candidat-pre-register/candidat-pre-register.component';
import { CandidatRegisterComponent } from './components/auth/candidat-register/candidat-register.component';
import { HomeComponent } from './home_page/home/home.component';

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
