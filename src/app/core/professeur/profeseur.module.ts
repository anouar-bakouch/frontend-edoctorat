import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProfesseurRoutingModule } from './professeur.routing.module';
import { MainProfComponent } from './components/main-prof/main-prof.component';
import { ProfCandidatComponent } from './components/prof-candidat/prof-candidat.component';
import { ProfCommissionComponent } from './components/prof-commission/prof-commission.component';
import { ProfInscritsComponent } from './components/prof-inscrits/prof-inscrits.component';
import { ProfResultatComponent } from './components/prof-resultat/prof-resultat.component';
import { OptionsComponent } from './components/options/options.component';
import { HeaderProfComponent } from './components/header/header-prof.component';
import { ContainerComponent } from './components/container/container.component';

@NgModule({
  declarations: [
      MainProfComponent,
      ProfCandidatComponent,
      ProfCommissionComponent,
      ProfInscritsComponent,
      ProfResultatComponent,
      OptionsComponent,
      HeaderProfComponent,
      ContainerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ProfesseurRoutingModule
  ],
  exports : [
      MainProfComponent
  ],
  bootstrap :[
    MainProfComponent
  ]
})

export class ProfesseurModule { }