import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatModule } from './candidat/candidat.module';
import { ProfesseurModule } from './professeur/professeur.module';
import { DirecteurCedModule } from './directeur-ced/directeur-ced.module';
import { DirecteurLaboModule } from './directeur-labo/directeur-labo.module';
import { DirecteurPoleModule } from './directeur-pole/directeur-pole.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CandidatModule,
    ProfesseurModule,
    DirecteurCedModule,
    DirecteurLaboModule,
    DirecteurPoleModule
  ]
})
export class CoreModule { }
