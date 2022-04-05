import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "src/app/shared/page-not-found/page-not-found.component";
import { BacComponent } from "./components/bac/bac.component";
import { CIngenieurComponent } from "./components/c-ingenieur/c-ingenieur.component";
import { CandidatMainComponent } from "./components/candidat-main/candidat-main.component";
import { ParcoursComponent } from "./components/candidat-mini-header/parcours.component";
import { DoctoratMedecineComponent } from "./components/doctorat-medecine/doctorat-medecine.component";
import { DutComponent } from "./components/dut/dut.component";
import { InfoPersonnelsComponent } from "./components/info-personnels/info-personnels.component";
import { LicenceComponent } from "./components/licence/licence.component";
import { MasterComponent } from "./components/master/master.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { PostulerComponent } from "./components/postuler/postuler.component";


const routes:Routes= [

    //diplomes :

    // postuler
    { path : 'candidat' , component: CandidatMainComponent , children :  [

    {   path : 'info_personnels' , component : InfoPersonnelsComponent},
    {   path : 'postuler', component : PostulerComponent},
    {   path : 'notifications' , component : NotificationsComponent },

    {   path : 'parcours' , redirectTo : 'parcours/bac' , pathMatch : 'full'},   

    {   path : 'parcours',component : ParcoursComponent , children : [
        {   path : 'bac' ,component : BacComponent },
        {   path : 'dut' ,component : DutComponent },
        {   path : 'cingenieur' , component : CIngenieurComponent },
        {   path : 'master' , component : MasterComponent },
        {   path : 'licence' , component : LicenceComponent },
        {   path : 'doctorat_medecine' , component : DoctoratMedecineComponent },
    ]},

    ]},

   {   path : '**' , component : PageNotFoundComponent },

];

@NgModule(
    {
        imports : [RouterModule.forChild(routes)],
        exports : [RouterModule]
    }
)

export class CandidatRoutingModule{}