import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-logout',
    template: ''
})
export class LogoutPage {

    constructor(
        public navCtrl: NavController,
        public storage : Storage) {}

    ionViewDidLoad() {
        this.storage.clear();
        this.navCtrl.setRoot(LoginPage);
    };

}
