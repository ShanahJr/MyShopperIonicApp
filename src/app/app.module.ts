import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { EventEmitterService } from "./Services/event-emitter.service";
import { DataService } from "./Services/data.service";

import { PopoverPageModule } from "./Components/popover/popover.module";

import { StoreModule } from "@ngrx/store";
import { Reducers } from "./app.reducer";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

//Page Imports
import { EditMainStorePage } from "./Pages/main-store/edit-main-store/edit-main-store.page";

@NgModule({
  declarations: [AppComponent, EditMainStorePage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PopoverPageModule,
    StoreDevtoolsModule,
    StoreModule.forRoot(Reducers),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EventEmitterService,
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
