import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CandidatModule } from './core/candidat/candidat.module';
import { CoreModule } from './core/core.module';
import { PublicModule } from './public/public.module';
import { HttpService } from './public/services/http.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    PublicModule,
    SharedModule,
    HttpClientModule,
    CandidatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
