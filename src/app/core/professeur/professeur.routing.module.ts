import { RouterModule, Routes } from "@angular/router";
import { ProfCandidatComponent } from "./prof-candidat/prof-candidat.component";
import { ProfCommissionComponent } from "./prof-commission/prof-commission.component";
import { ProfInscritsComponent } from "./prof-inscrits/prof-inscrits.component";
import { ProfResultatComponent } from "./prof-resultat/prof-resultat.component";
import { ProfSujetComponent } from "./prof-sujet/prof-sujet.component";
import { NgModule } from "@angular/core";
import { MainComponent } from "src/app/public/main/main.component";

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
        imports : [RouterModule.forChild(routes)]
    }
)

export class ProfesseurRoutingModule{}

