import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainProfComponent } from './main-prof/main-prof.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProfCandidatComponent } from './prof-candidat/prof-candidat.component';
import { ProfCommissionComponent } from './prof-commission/prof-commission.component';
import { ProfInscritsComponent } from './prof-inscrits/prof-inscrits.component';
import { ProfResultatComponent } from './prof-resultat/prof-resultat.component';
import { ProfesseurRoutingModule } from './professeur.routing.module';
import { HeaderProfComponent } from 'src/app/shared/header/header-prof.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
      MainProfComponent,
      ProfCandidatComponent,
      ProfCommissionComponent,
      ProfInscritsComponent,
      ProfResultatComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ProfesseurRoutingModule,
    SharedModule
  ],
  exports : [
      MainProfComponent
  ]
})
export class ProfesseurModule { }