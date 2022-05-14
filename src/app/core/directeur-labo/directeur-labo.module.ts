import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SujetsComponent } from './components/sujets/sujets.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { ResultatsComponent } from './components/resultats/resultats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MainLaboComponent } from './components/main-labo/main-labo.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { OptionsComponent } from './components/options/options.component';
import { DirecteurLaboComponent } from './components/directeur-labo.component';
import { LaboRoutingModule } from './labo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    SujetsComponent,
    CommissionsComponent,
    ResultatsComponent,
    MainLaboComponent,
    CandidatsComponent,
    OptionsComponent,
    DirecteurLaboComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    LaboRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    DirecteurLaboComponent
  ],
  bootstrap: [
    DirecteurLaboComponent
  ]
})
export class DirecteurLaboModule { }
