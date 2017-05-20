import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage'
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';

import 'rxjs/add/operator/map';


@Component({
    selector: 'page-payComplete',
    templateUrl: 'payComplete.html',
})
export class PayCompletePage {

	public shopId : string;
	public shopName : string;

	public billDate : string;
	public billTotal : string;
	public billData : Array <{
		productName : string,
		productPrice : number,
		productQuantity: number
	}>;

	constructor(
	 	public navCtrl : NavController,
	 	public storage : Storage,
	 	public http : Http
    ) {
    	// get shop id form local storage
     	this.storage.get('shopId').then((val)=>{
     		this.shopId = val.toString();
     	});

     	// get shop name from local storage
     	this.storage.get('shopName').then((val)=>{
     		this.shopName = val.toString();
     	});
    }

    ionViewDidLoad() {

    	this.getShopIdFromStorage();

    }

    doRedirectHome() {
    	console.log('1');
    	this.navCtrl.setRoot(HomePage);
    	console.log('2');
    }

    getShopIdFromStorage(){

		let shopId;

		this.storage.ready().then(() => {

	         // get value 
	        this.storage.get('shopId').then((val) => {

	           shopId = val.toString();
	           this.getBillCompleted(shopId);
	        })
    	});
	}



    getBillCompleted(shopId) {
    	let url = 'http://sale-card.herokuapp.com/bill/complete';

    	let header = new Headers();
    	header.append('Content-Type', 'application/json');

    	let data = JSON.stringify({
    		shopId : shopId
    	});

    	console.log('data: '+ data);

    	this.http.post( url, data, {headers : header}).map(res => res.json()).subscribe(data => {

    		console.log(data);

    		if (data.status == '0') {
    			console.log('recieve data');
    			this.billDate = data.data.billDate;
    			this.billTotal = data.data.billTotal;
    			this.billData = data.data.billData;
    		}
    	});
    }
}
