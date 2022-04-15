import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatComponent } from './core/candidat/components/candidat.component';
import { MainCedComponent } from './core/directeur-ced/components/main-ced/main-ced.component';
import { DirecteurPoleComponent } from './core/directeur-pole/components/directeur-pole.component';
import { MainProfComponent } from './core/professeur/components/main-prof/main-prof.component';
import { HomeComponent } from './public/components/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [

  { path : '', redirectTo : 'home/infos' , pathMatch : 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'professeur', component: MainProfComponent },
  { path: 'candidat', component: CandidatComponent },
  { path: 'pole', component: DirecteurPoleComponent },
  { path: 'ced', component: MainCedComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
