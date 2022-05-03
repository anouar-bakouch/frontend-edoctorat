import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatComponent } from './core/candidat/components/candidat.component';
import { MainCedComponent } from './core/directeur-ced/components/main-ced/main-ced.component';
import { DirecteurPoleComponent } from './core/directeur-pole/components/directeur-pole.component';
import { MainProfComponent } from './core/professeur/components/main-prof/main-prof.component';
import { IsCandidatGuard } from './guards/is-candidat.guard';
import { IsCEDGuard } from './guards/is-ced.guard';
import { IsDPoleGuard } from './guards/is-dpole.guard';
import { IsProfessorGuard } from './guards/is-professor.guard';
import { HomeComponent } from './public/components/home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/infos', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'professeur',
    component: MainProfComponent,
    canActivate: [IsCandidatGuard],
  },
  { path: 'candidat', loadChildren: () => import('./core/candidat/candidat.module').then(x => x.CandidatModule) } ,
  {
    path: 'pole',
    component: DirecteurPoleComponent,
    canActivate: [IsProfessorGuard, IsDPoleGuard],
  },
  {
    path: 'ced',
    component: MainCedComponent,
    canActivate: [IsProfessorGuard, IsCEDGuard],
  },
 { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
