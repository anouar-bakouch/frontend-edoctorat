import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainComponent } from "src/app/public/main/main.component";
import { ProfCandidatComponent } from "./components/prof-candidat/prof-candidat.component";
import { ProfCommissionComponent } from "./components/prof-commission/prof-commission.component";
import { ProfInscritsComponent } from "./components/prof-inscrits/prof-inscrits.component";
import { ProfResultatComponent } from "./components/prof-resultat/prof-resultat.component";
import { ProfSujetComponent } from "./components/prof-sujet/prof-sujet.component";

const routes:Routes= [
    
         { path : 'professeur', component : MainComponent , children : [

            {path:'sujetprof',component: ProfSujetComponent},
            {path:'candidatprof',component:ProfCandidatComponent},
            {path:'commissionprof',component:ProfCommissionComponent},
            {path:'resultatprof',component:ProfResultatComponent},
            {path:'inscritsprof',component:ProfInscritsComponent}

         ]}           
];

@NgModule(
    {
        imports : [RouterModule.forChild(routes)],
        exports : [RouterModule]
    }
)

export class ProfesseurRoutingModule{}

