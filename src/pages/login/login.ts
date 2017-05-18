import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { SignUpPage } from '../signUp/signUp';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    email: string = '';
    password: string = '';

    constructor(public http: Http,
        public navParams: NavParams,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public storage : Storage) {}

    doLogin() {
        const URL = 'http://sale-card.herokuapp.com/login';

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = JSON.stringify({
            email: this.email,
            password: this.password
        });

        if (this.email === '' || this.password === '') {
            let arlert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Email or Password empty!',
                buttons: ['OK']
            });
            arlert.present();
            return;
        }

        let loadingMask = this.loadingCtrl.create({
            content: 'Authenticate...'
        });
        loadingMask.present();

        this.http.post(URL, data, { headers: headers }).map(res => res.json()).subscribe(data => {
            if (data.status === '0') {
                loadingMask.dismiss();
                this.storage.set('shopId',data.data.shopId);
                this.storage.set('shopName',data.data.shopName);
                this.navCtrl.setRoot(HomePage, { data: data });
            } else if (data.status === '10') {
                loadingMask.dismiss();

                let arlert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Email or Password is incorrect!',
                    buttons: ['OK']
                });

                arlert.present();
            }
        });
    };

    doRedirectRegist() {
        this.navCtrl.push(SignUpPage);
    }
}
