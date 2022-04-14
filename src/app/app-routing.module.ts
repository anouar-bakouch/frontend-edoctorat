import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatComponent } from './core/candidat/components/candidat.component';
import { MainCedComponent } from './core/directeur-ced/components/main-ced/main-ced.component';
import { MainProfComponent } from './core/professeur/components/main-prof/main-prof.component';
import { HomeComponent } from './public/home_page/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'professeur', component: MainProfComponent },
  { path: 'candidat', component: CandidatComponent },
  { path: 'ced', component: MainCedComponent },
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '/' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
