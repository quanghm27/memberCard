import { Component } from '@angular/core';
import { AlertController, NavParams, LoadingController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http, Headers } from '@angular/http';
import { PayCompletePage } from '../payComplete/payComplete';

import 'rxjs/add/operator/map';


@Component({
    selector: 'page-pay',
    templateUrl: 'pay.html',
})
export class PayPage {

    public cardCode: string = '';
    public shopId : string;
    private products: Array < {
        value: string
    } > ;
    
    constructor(
        public alertCtrl : AlertController,
        public params : NavParams,
        public loadingCtrl : LoadingController,
        public http : Http,
        public storage : Storage,
        public navCtrl : NavController
    ) {
        this.products = [{
            value: ''
        }];

        // get shopId from local storage
        this.storage.get('shopId').then((val)=>{
            this.shopId = val.toString();
        });
    }

    // doCheckCard() {

    //     if (this.cardCode === '') {
    //         let alert = this.createMessage('Error', 'Card code cannot null');
    //         alert.present();
    //         return;
    //     }

    //     const URL = 'http://sale-card.herokuapp.com/pay/checkCard?cardCode=' + this.cardCode;

    //     this.http.get(URL).map(res => res.json()).subscribe(data => {

    //         if (data.status === '7') {
    //             let alert = this.createMessage('Error', data.message);
    //             alert.present();
    //             return;
    //         }

    //     });
    // }

    doPay() {

        let productArr: Array < {
            productCode: string,
            quantity: number
        } > ;

        productArr = [];
        let obj = {};

        for (let i = 0; i < this.products.length; i++) {
            let product = this.products[i];

            if (product.value === "") {
                continue;
            }

            if (obj.hasOwnProperty(product.value)) {
                obj[product.value]++;
            } else {
                obj[product.value] = 1;
            }

        }

        for (let key in obj) {
            productArr.push({
                productCode: key,
                quantity: obj[key]
            });
        }

        const URL = 'http://sale-card.herokuapp.com/pay';

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = JSON.stringify({
            cardCode: this.cardCode,
            userId: this.shopId,
            products: productArr
        })

        //console.log(data);

        let loadingCtrl = this.loadingCtrl.create({
            content : 'Please wait, work in Progress ...'
        });

        loadingCtrl.present();
        this.http.post(URL, data, { headers: headers }).map(res => res.json()).subscribe(data => {

            loadingCtrl.dismiss();
            let msgString;

            console.log(data);

            // pay OK
            if (data.status == '0') {
                this.navCtrl.setRoot(PayCompletePage);
                return;
            }

            // pay NG
            switch (data.status) {
                case '7' :
                    msgString = (data.message + ' : ' + data.data.cardCode);
                    break;

                default :
                    let ngProductArr = [];
                    for (let i = 0; i < data.data.length ; i++) {
                        ngProductArr.push(' ' + data.data[i].productCode + ' ');
                    };
                    msgString = (data.message + ' :' + "\n" + ngProductArr);
            }
                
            let alert = this.createMessage('Error', msgString);
            alert.present();
        });
    }

    createMessage(title, subTitle) {

        let arlert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: ['OK']
        });

        return arlert;
    }

    doScanCardcode() {

        // scan barcode of card
        let barcodeScanner = new BarcodeScanner();

        barcodeScanner.scan().then((result) => {
            if (!result.cancelled) {
                this.cardCode = result.text;
            }
        }, (error) => {

            console.log('error when scanning cardCode');

        });

    }

    doScanProduct() {

        // scan barcode of product
        let barcodeScanner = new BarcodeScanner();

        barcodeScanner.scan().then((result) => {
            if (!result.cancelled) {
                // when scan ok
                if (this.products[0].value == '') {
                    // array empty, set value for item
                    this.products[0].value = result.text;
                } else {
                    // array not emoty, add new element
                    this.products.push({ value: result.text });
                }
            }
        }, (error) => {
            console.log('error while scanning product');

        });

    }

    // method add
    doAddProduct() {
        this.products.push({ value: '' });
    }

    // method remove
    doRemoveProduct(index) {
        this.products.splice(index, 1);
    }


    isDisable() {

        if (this.cardCode == '' || this.products.every(this.checkProductsEmpty)) {
            // if card code or products is empty, disable button submit
            return '';
        }

        return null;
    }


    checkProductsEmpty(product) {
        if (product.value == '') {
            return true;
        }
    }
}
