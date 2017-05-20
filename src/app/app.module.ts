import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signUp/signUp';
import { LogoutPage } from '../pages/logOut/logOut';
import { CreateCardPage } from '../pages/card/create';
import { CardsPage } from '../pages/cardAll/cards';
import { CardEditPage } from '../pages/cardEdit/cardEdit';
import { PayPage } from '../pages/pay/pay';
import { PayCompletePage } from '../pages/payComplete/payComplete';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CreateCardPage,
    PayPage,
    SignUpPage,
    CardsPage,
    LogoutPage,
    CardEditPage,
    PayCompletePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CreateCardPage,
    PayPage,
    SignUpPage,
    CardsPage,
    LogoutPage,
    CardEditPage,
    PayCompletePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    IonicStorageModule,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
