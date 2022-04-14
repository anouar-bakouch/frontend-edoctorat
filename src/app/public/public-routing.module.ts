import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConnexionComponent } from "./components/auth/connexion/connexion.component";


const routes: Routes = [{ path: 'connexion', component: ConnexionComponent }];

@NgModule(
    {
        imports : [RouterModule.forChild(routes)],
        exports : [RouterModule]
    }
)

export class PublicRoutingModule{}