import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-signUp',
    templateUrl: 'signUp.html'
})
export class SignUpPage {

    name : string = '';
    email: string = '';
    password: string = '';

    constructor(public http: Http,
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public storage : Storage,
        public modalCtrl: ModalController) {}

    doRegist() {
        const URL = 'http://sale-card.herokuapp.com/signUp';

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = JSON.stringify({
            name : this.name,
            email: this.email,
            password: this.password
        });

        if (this.email === '' || this.password === '' || this.name === '') {
            let arlert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'All fields must be fill!',
                buttons: ['OK']
            });
            arlert.present();
            return;
        }

        let loadingMask = this.loadingCtrl.create({
            content: `
                      <div class="custom-spinner-container">Signing up...
                        <div class="custom-spinner-box">Please wait a seconds</div>
                      </div>`,
        });
        loadingMask.present();

        this.http.post(URL, data, { headers: headers }).map(res => res.json()).subscribe(data => {
            if (data.status === '0') {

                loadingMask.dismiss();

                let arlert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: "You have been registed, please login to use.",
                    buttons: ['OK']
                });

                arlert.present();
                return;

            } else if (data.status === '1') {
                loadingMask.dismiss();

                let arlert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Email is already exist',
                    buttons: ['OK']
                });

                arlert.present();
            }
        });
    };

    isDisable() {

        // check field empty
        if (this.name == '' || this.email == '' || this.password == '') {

           // case one field is empty, set button submit to disable
           return '';
       }

       // case all field are filled, set button submit to active
       return null;
    }
}
