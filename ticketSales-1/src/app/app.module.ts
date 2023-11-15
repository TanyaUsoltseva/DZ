import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthService } from './pages/services/auth/auth.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { RestInterceptorsService } from './pages/services/intercepetors/rest-interceptors.service';
import { ConfigService } from './pages/services/config/config.service';



function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}
@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true},

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

