import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BacComponent } from "./components/bac/bac.component";
import { CIngenieurComponent } from "./components/c-ingenieur/c-ingenieur.component";
import { CandidatParcoursComponent } from "./components/candidat-parcours/parcours.component";
import { CandidatComponent } from "./components/candidat.component";
import { DoctoratMedecineComponent } from "./components/doctorat-medecine/doctorat-medecine.component";
import { DutComponent } from "./components/dut/dut.component";
import { InfoPersonnelsComponent } from "./components/info-personnels/info-personnels.component";
import { LicenceComponent } from "./components/licence/licence.component";
import { MasterComponent } from "./components/master/master.component";
import { PostulerComponent } from "./components/postuler/postuler.component";


const routes:Routes= [

    //diplomes :

   {   path : '' , redirectTo : '/bac', pathMatch : 'full' },
   {   path : 'bac' ,component : BacComponent },
   {   path : 'dut' , component : DutComponent },
   {   path : 'cingenieur' , component : CIngenieurComponent },
   {   path : 'master' , component : MasterComponent },
   {   path : 'licence' , component : LicenceComponent },
   {   path : 'doctorat_medecine' , component : DoctoratMedecineComponent },
   {   path : 'info_personnels' , component : InfoPersonnelsComponent},
   // postuler

   {   path : 'postuler', component : PostulerComponent},
   {   path : 'parcours',redirectTo : '/bac' , pathMatch : 'full'}
];

@NgModule(
    {
        imports : [RouterModule.forRoot(routes)],
        exports : [RouterModule]
    }
)


export class CandidatRoutingModule{}