import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-billDetail',
    templateUrl: 'billDetail.html',
})
export class BillDetailPage {

	private bill;
	private shopName;
	public billData : Array <{
		productName : string,
		productQuantity : string,
		productPrice : string
	}>;

	constructor(public params: NavParams,
				public storage : Storage,
				public http: Http) {
		this.bill = this.params.get('item');

		this.storage.get('shopName').then((val)=>{
			this.shopName = val;
		});
	}

	ionViewDidLoad () {

		let url = 'http://sale-card.herokuapp.com/bill/detail';

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let data = JSON.stringify({
			billId : this.bill.billId
		});

		console.log('param billId : ' + data);
		this.billData = [];

		this.http.post(url, data, { headers: headers }).map(res => res.json()).subscribe(data => {



			if (data.status === '0') {

				// get data and store to array
				for (let i = 0 ; i < data.data.billData.length ; i++) {

					this.billData.push({
						productName : data.data.billData[i].productName.toString(),
						productPrice : data.data.billData[i].productPrice.toString(),
						productQuantity : data.data.billData[i].productQuantity.toString()
					});
				}
				
			}

		});

	}
}