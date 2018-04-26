import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DetailsPage} from "../pages/details/details";
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { HttpClientModule} from "@angular/common/http";
import { Geolocation} from "@ionic-native/geolocation";
import { HTTP} from "@ionic-native/http";
import {GoogleMaps} from "@ionic-native/google-maps";
import { Spherical} from "@ionic-native/google-maps";

const firebaseConfig = {
    apiKey: "AIzaSyAryT4pHE0I-ZFB7Y-cYV-mR-SjB7gJs0Q",
    authDomain: "seatcrawler394.firebaseapp.com",
    databaseURL: "https://seatcrawler394.firebaseio.com",
    projectId: "seatcrawler394",
    storageBucket: "seatcrawler394.appspot.com",
    messagingSenderId: "488694325789"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LaunchNavigator,
    Geolocation,
    HTTP,
    GoogleMaps,
    Spherical,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}

