import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiplomeType } from 'src/app/enums/DiplomeType';
import { IsCandidatGuard } from 'src/app/guards/is-candidat.guard';
import { BacComponent } from './components/bac/bac.component';
import { CIngenieurComponent } from './components/c-ingenieur/c-ingenieur.component';
import { ParcoursComponent } from './components/candidat-mini-header/parcours.component';
import { ContainerComponent } from './components/container/container.component';
import { DoctoratMedecineComponent } from './components/doctorat-medecine/doctorat-medecine.component';
import { DutComponent } from './components/dut/dut.component';
import { InfoPersonnelsComponent } from './components/info-personnels/info-personnels.component';
import { LicenceProComponent } from './components/licence-pro/licence-pro.component';
import { LicenceComponent } from './components/licence/licence.component';
import { MasterProComponent } from './components/master-pro/master-pro.component';
import { MasterComponent } from './components/master/master.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PostulerComponent } from './components/postuler/postuler.component';
import { ProfilCandidatComponent } from './components/profil-candidat/profil-candidat.component';

const routes: Routes = [
  {
    path: 'candidat',
    redirectTo: 'candidat/info_personnels',
    pathMatch: 'full',
  },
  
  { path: 'profil', component: ProfilCandidatComponent },

  {
    path: 'candidat',
    
    component: ContainerComponent,
    canActivateChild: [IsCandidatGuard],
    children: [
      { path: 'info_personnels', component: InfoPersonnelsComponent },
      { path: 'postuler', component: PostulerComponent },
      { path: 'notifications', component: NotificationsComponent },
      
      { path: 'parcours', redirectTo: 'parcours/'+DiplomeType.BAC, pathMatch: 'full' },

      {
        path: 'parcours',
        component: ParcoursComponent,
        children: [
          { path: DiplomeType.BAC, component: BacComponent },
          { path: DiplomeType.DUT, component: DutComponent },
          { path: DiplomeType.CI, component: CIngenieurComponent },
          { path: DiplomeType.MASTER, component: MasterComponent },
          { path: DiplomeType.MASTER_SPECIALISE, component: MasterProComponent },
          { path: DiplomeType.LICENCE, component: LicenceComponent },
          { path: DiplomeType.LICENCE_PROFESSIONNELLE, component: LicenceProComponent },
          { path: DiplomeType.DOCTORATE_EN_MEDICINE, component: DoctoratMedecineComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CandidatRoutingModule {}
