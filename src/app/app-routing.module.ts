import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./shared/login/login.component";

const routes:Routes= [

    //login 


];

@NgModule(
    {
        imports : [RouterModule.forRoot(routes)],
        exports : [RouterModule]
    }
)

export class AppRoutingModule{}