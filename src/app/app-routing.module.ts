import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CandidatComponent } from "./core/candidat/components/candidat.component";
import { DirecteurPoleComponent } from "./core/directeur-pole/components/directeur-pole.component";
import { DirecteurPoleModule } from "./core/directeur-pole/directeur-pole.module";
import { HomeComponent } from "./public/home/home.component";

const routes:Routes= [

    
    {path : 'home' , component : HomeComponent},
    {path : 'pole' , component : DirecteurPoleComponent},
    { path : 'candidat' , component : CandidatComponent}

];

@NgModule(
    {
        imports : [RouterModule.forRoot(routes)],
        exports : [RouterModule]
    }
)

export class AppRoutingModule{}