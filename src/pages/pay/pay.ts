import { Component } from '@angular/core';
import { AlertController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
    selector: 'page-pay',
    templateUrl: 'pay.html',
})
export class PayPage {

    checkCardFlg: boolean = true;

    cardCode: string = '';

    payObj = {};

    private products: Array < {
        value: string
    } > ;

    constructor(
        public alertCtrl: AlertController,
        public http: Http,
        public params: NavParams,
        public storage: Storage
    ) {
        this.products = [{
            value: ''
        }];
    }

    doCheckCard() {

        if (this.cardCode === '') {
            let alert = this.createMessage('Error', 'Card code cannot null');
            alert.present();
            return;
        }

        const URL = 'http://sale-card.herokuapp.com/pay/checkCard?cardCode=' + this.cardCode;

        this.http.get(URL).map(res => res.json()).subscribe(data => {

            if (data.status === '7') {
                let alert = this.createMessage('Error', data.message);
                alert.present();
                return;
            }

        });
    }

    getshopId(shopId) {

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
            userId : shopId,
            products: productArr
        })

        console.log(data);

        this.http.post(URL, data, {headers : headers}).map(res => res.json()).subscribe(data => {

            console.log('data send');
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

    doScan() {

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
                if (this.products[0].value == '' ) {
                    // array empty, set value for item
                    this.products[0].value = result.text ;
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

    doCheckProducts() {

        let shopId;

        this.storage.ready().then(() => {

             // get value 
            this.storage.get('shopId').then((val) => {

               shopId = val.toString();
               this.getshopId(shopId);
            })
        });
    }
}
