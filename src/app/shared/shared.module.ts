import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OptionsComponent } from './options/options.component';
import { HeaderProfComponent } from './header/header-prof.component';


@NgModule({
  declarations: [

    PageNotFoundComponent,
    OptionsComponent,
    HeaderProfComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent,
    HeaderProfComponent,
    OptionsComponent
  ]
})
export class SharedModule { }
