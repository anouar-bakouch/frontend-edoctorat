import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CandidatComponent } from "./core/candidat/components/candidat.component";
import { HomeComponent } from "./public/home/home.component";

const routes:Routes= [

    
    {path : 'home' , component : HomeComponent},
    { path : 'candidat' , component : CandidatComponent}

];

@NgModule(
    {
        imports : [RouterModule.forRoot(routes)],
        exports : [RouterModule]
    }
)

export class AppRoutingModule{}