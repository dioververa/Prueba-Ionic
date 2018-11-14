import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StarWarsService } from '../services/star-wars-api.service';
import { TruncatePipe } from '../pipes/limit-to.pipe';
import { Actor } from '../pages/actor/actor';
import { filmComponent } from '../pages/film/film';
import { VehicleComponent } from '../pages/vehicle/vehicle';
import { StarShipComponent } from '../pages/star-ship/star-ship';

@NgModule({
  declarations: [
    MyApp,
    VehicleComponent,
    StarShipComponent,
    filmComponent,
    TabsPage,
    TruncatePipe,
    Actor
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VehicleComponent,
    StarShipComponent,
    filmComponent,
    TabsPage,
    Actor
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StarWarsService
  ]
})
export class AppModule {}
