import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PublicModule } from './public/public.module';
import { HttpService } from './public/services/http.service';
import { SharedModule } from './shared/shared.module';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
    AppRoutingModule,
    SharedModule,
    NgbModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
