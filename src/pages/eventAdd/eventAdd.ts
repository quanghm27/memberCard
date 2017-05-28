import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-eventAdd',
    templateUrl: 'eventAdd.html',
})
export class EventAddPage {

    public shopId: string;

    public eventType: string;
    public eventName: string;
    public productArray: Array < {
        productCode: string,
        bonusPoint: string
    } > ;
    public endDate: string;
    public startDate: string;

    public bonusPoint: string

    constructor(
        public http: Http,
        public storage: Storage,
        public alertCtl: AlertController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController
    ) {
        this.productArray = [{
            productCode: '',
            bonusPoint: ''
        }];

        this.storage.get('shopId').then((val) => {
            this.shopId = val;
        });


        console.log(this.eventName);
        console.log(this.startDate);
        console.log(this.endDate);
    }

    doPostEvent() {

        let data;
        if (this.eventType === '1') {
            data = JSON.stringify({
                shopId: this.shopId,
                eventType: this.eventType,
                eventName: this.eventName,
                dataArray: this.productArray,
                startDate: this.startDate,
                endDate: this.endDate
            });
        } else {
            data = JSON.stringify({
                shopId: this.shopId,
                eventType: this.eventType,
                eventName: this.eventName,
                bonusPoint: this.bonusPoint,
                startDate: this.startDate,
                endDate: this.endDate
            });
        }

        console.log(data);

        let url = 'http://sale-card.herokuapp.com/event/create';

        let header = new Headers();
        header.append('Content-Type', 'application/json');

        let loading = this.loadingCtrl.create({
            content: 'Please wait, work in Progress ...'
        });
        loading.present();

        this.http.post(url, data, { headers: header }).map(res => res.json()).subscribe(data => {

            if (data.status === '0') {
                loading.dismiss();

                let toastCtrl = this.toastCtrl.create({
                    message: 'Event is created successfully!',
                    position: 'top',
                    duration: 1500
                });

                toastCtrl.present();
            } else {
                loading.dismiss();

                let arlert = this.alertCtl.create({
                    title: 'Error',
                    subTitle: data.message,
                    buttons: ['OK']
                });

                arlert.present();
            }

            console.log(data);
        });



    }

    doAddProduct() {
        this.productArray.push({
            productCode: '',
            bonusPoint: ''
        })
    }

    doRemoveProduct(idx) {
        this.productArray.splice(idx, 1);
    }

    isDisableEvent1() {

        if (this.startDate ===  undefined || 
            this.eventName == undefined || 
            this.endDate == undefined ||
            this.productArray.every(this.checkProductsEmpty) ) {
            // if card code or products is empty, disable button submit
            return '';
        }

        return null;
    }


    checkProductsEmpty(product) {
        if (product.productCode == '' || product.bonusPoint == '') {
            return true;
        }
    }

    isDisableEvent2() {

        if (this.startDate ===  undefined || 
            this.eventName == undefined || 
            this.endDate == undefined ||
            this.bonusPoint === undefined) {
            // if card code or products is empty, disable button submit
            return '';
        }

        return null;
    }


}
