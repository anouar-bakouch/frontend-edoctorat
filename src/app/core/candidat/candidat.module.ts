import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacComponent } from './components/bac/bac.component';
import { CandidatParcoursComponent } from './components/candidat-parcours/parcours.component';
import { HeaderItemComponent } from './components/header-candidat-item/header-item.component';
import { SideCompteComponent } from './components/side-left-compte/side-compte.component';
import { CountriesService } from './services/countries.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CandidatComponent } from './components/candidat.component';
import { ParcoursComponent } from './components/candidat-mini-header/parcours.component';
import { PostulerComponent } from './components/postuler/postuler.component';
import { CandidatRoutingModule } from './candidat-routing.module';
import { DutComponent } from './components/dut/dut.component';
import { CIngenieurComponent } from './components/c-ingenieur/c-ingenieur.component';
import { DoctoratMedecineComponent } from './components/doctorat-medecine/doctorat-medecine.component';
import { MasterComponent } from './components/master/master.component';
import { LicenceComponent } from './components/licence/licence.component';
import { InfoPersonnelsComponent } from './components/info-personnels/info-personnels.component';
import { SujersComponent } from './components/sujers/sujers.component';
import { ChoisirSujetsComponent } from './components/choisir-sujets/choisir-sujets.component';


@NgModule({
  declarations: [
    CandidatParcoursComponent,
    HeaderItemComponent,
    SideCompteComponent,
    BacComponent,
    CandidatComponent,
    CandidatParcoursComponent,
    ParcoursComponent,
    PostulerComponent,
    DutComponent,
    CIngenieurComponent,
    DoctoratMedecineComponent,
    MasterComponent,
    LicenceComponent,
    InfoPersonnelsComponent,
    SujersComponent,
    ChoisirSujetsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    CandidatRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports : [
   CandidatComponent
  ],
   providers: [
     CountriesService
   ],
   bootstrap : [
     CandidatComponent
   ]
})
export class CandidatModule { }
