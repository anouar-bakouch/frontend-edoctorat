import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OffsetpaginationComponent } from './components/offsetpagination/offsetpagination.component';

@NgModule({
  declarations: [PageNotFoundComponent, OffsetpaginationComponent],
  imports: [CommonModule],
  exports: [PageNotFoundComponent, OffsetpaginationComponent],
})
export class SharedModule {}
