import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CandidatComponent } from "./core/candidat/components/candidat.component";
import { MainProfComponent } from "./core/professeur/components/main-prof/main-prof.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";


const routes:Routes= [
  
    { path : 'professeur' , component : MainProfComponent},
    { path : 'candidat' , component : CandidatComponent},
    { path : '**' , component : PageNotFoundComponent}

];

@NgModule(
    {
        imports : [RouterModule.forRoot(routes)],
        exports : [RouterModule]
    }
)

export class AppRoutingModule{}