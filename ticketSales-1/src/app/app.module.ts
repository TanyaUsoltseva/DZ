import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RestInterceptorsService } from './pages/services/intercepetors/rest-interceptors.service';
import { ConfigService } from './pages/services/config/config.service';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { TableModule } from "primeng/table"
import { SettingsModule } from "./pages/settings/settings.module";
import { OrderModule } from './pages/order/order.module';



function initializeApp(config: ConfigService) {
  return () => config.loadPromise().then(() => {
    console.log('---CONFIG LOADED--', ConfigService.config)
  });
}
@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [ConfigService], multi: true
        },
        { provide: HTTP_INTERCEPTORS, useClass: RestInterceptorsService, multi: true },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        TabViewModule,
        FormsModule,
        TableModule,
        SettingsModule,
        OrderModule
    ]
})

export class AppModule { }

