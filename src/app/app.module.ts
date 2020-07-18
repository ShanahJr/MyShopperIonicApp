import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { EventEmitterService } from "./Services/event-emitter.service"

import { PopoverPageModule } from './Components/popover/popover.module';

//Page Imports
import { EditMainStorePage } from './Pages/main-store/edit-main-store/edit-main-store.page';

@NgModule({
  declarations: [
    AppComponent,
    EditMainStorePage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PopoverPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
