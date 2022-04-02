import { NgModule } from '@angular/core';
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
    WelcomeComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    HomeComponent
  ],
  providers : [
    HttpService
  ]
})
export class PublicModule { }
