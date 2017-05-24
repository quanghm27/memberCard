import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { CardsPage } from '../pages/cardAll/cards';
import { CreateCardPage } from '../pages/card/create';

import { PayPage } from '../pages/pay/pay';


import { LogoutPage } from '../pages/logOut/logOut';
import { LoginPage } from '../pages/login/login';

import { BillAllPage } from '../pages/billAll/billAll';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

   rootPage = HomePage;
  //rootPage = PayCompletePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Pay', component: PayPage },
      { title: 'View all bills', component: BillAllPage},
      { title: 'Create Card', component: CreateCardPage },
      { title: 'Card lists', component: CardsPage},
      { title: 'Log out', component: LogoutPage}
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
