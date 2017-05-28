import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { PayPage } from '../pay/pay';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-card',
    templateUrl: 'create.html',
})
export class CreateCardPage {

    guestName: string = '';
    phoneNumber: string = '';
    public cardCode : string = null;
    public shopId : string;

    constructor(public http: Http,
                public navCtrl: NavController,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController,
                public storage: Storage) {

        // get shopId from local storage
        this.storage.get('shopId').then((val)=>{
            this.shopId = val.toString();
        });
    }

    doPostCard() {
        // set URL for http service
        const URL = 'http://sale-card.herokuapp.com/card/create';

        // set header for http service
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        // set data for http service
        let data = JSON.stringify({
            shopId: this.shopId,
            guestName: this.guestName,
            phoneNumber: this.phoneNumber
        });

        console.log(this.shopId);
        
        // validate input
        if (this.guestName === '' || this.guestName === '') {
            // set alert
            let arlert = this.createMessage('Error', 'Guest name or Phone number is empty');
            arlert.present();
            return;
        }

        // creating loading mask
        let loadingMask = this.loadingCtrl.create({
            content: 'Creating...'
        });
        loadingMask.present();

        // call api
        this.http.post(URL, data, { headers: headers }).map(res => res.json()).subscribe(
            data => {

                if (data.status === '0') {

                    loadingMask.dismiss();
                    // set key, value for localStorage
                    console.log('11');
                    this.cardCode = data.data.cardCode;
                } else {
                    // TO-DO: switch case for data.status to get error
                    // call function createMessage
                    loadingMask.dismiss();
                    let arlert = this.createMessage('Error', data.message);
                    arlert.present();
                }

            }, err => {
                loadingMask.dismiss();
                let arlert = this.createMessage('Error', 'Time out');
                arlert.present();
            });
    };


    createMessage(title, subTitle) {

        let arlert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });

        return arlert;
    }

    doRedirect(){
        this.navCtrl.setRoot(PayPage);
    }


     isDisable() {

        if (this.guestName == '' || this.phoneNumber == '') {
            // if card code or products is empty, disable button submit
            return '';
        }

        return null;
    }
}
