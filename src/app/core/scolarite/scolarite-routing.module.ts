import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { ContainerComponent } from './components/container/container.component';

const routes: Routes = [
  {
    path: 'scolarite',
    redirectTo: 'scolarite/candidats',
    pathMatch: 'full',
  },
  {
    path: 'scolarite',
    component: ContainerComponent,
    children: [
      { path: 'candidats', component: CandidatsComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScolariteRoutingModule { }
