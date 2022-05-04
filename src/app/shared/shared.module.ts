import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OffsetpaginationComponent } from './components/offsetpagination/offsetpagination.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    OffsetpaginationComponent,
    AlertComponent,
  ],
  imports: [CommonModule],
  exports: [PageNotFoundComponent, OffsetpaginationComponent, AlertComponent],
})
export class SharedModule {}
