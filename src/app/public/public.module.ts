import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidatLoginComponent } from './components/auth/candidat-login/candidat-login.component';
import { CandidatPreRegisterComponent } from './components/auth/candidat-pre-register/candidat-pre-register.component';
import { CandidatRegisterComponent } from './components/auth/candidat-register/candidat-register.component';
import { CalendrierComponent } from './components/home_page/calendrier/calendrier.component';
import { CedComponent } from './components/home_page/ced/ced.component';
import { ConnexionComponent } from './components/home_page/connexion/connexion.component';
import { ConseilsComponent } from './components/home_page/footer/conseils/conseils.component';
import { FooterComponent } from './components/home_page/footer/footer.component';
import { FormationsComponent } from './components/home_page/formations/formations.component';
import { HeaderComponent } from './components/home_page/header/header.component';
import { HomeComponent } from './components/home_page/home/home.component';
import { WelcomeComponent } from './components/home_page/welcome/welcome.component';
import { PublicRoutingModule } from './public-routing.module';
import { HttpService } from './services/http.service';
import { MainComponent } from './components/home_page/main/main.component';
import { LaboratoiresComponent } from './components/home_page/laboratoires/laboratoires.component';


@NgModule({
  declarations: [
    CalendrierComponent,
    CedComponent,
    ConseilsComponent,
    FooterComponent,
    FormationsComponent,
    HeaderComponent,
    HomeComponent,
    WelcomeComponent,
    ConnexionComponent,
    CandidatLoginComponent,
    CandidatPreRegisterComponent,
    CandidatRegisterComponent,
    LaboratoiresComponent,
    MainComponent
  ],
  imports: [CommonModule, PublicRoutingModule, ReactiveFormsModule],
  exports: [HomeComponent],
  providers: [HttpService],
})

export class PublicModule {}
