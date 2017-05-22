import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { BillDetailPage } from '../billDetail/billDetail';
import 'rxjs/add/operator/map';



@Component({
    selector: 'page-billAll',
    templateUrl: 'billAll.html',
})
export class BillAllPage {


	private dataArray : Array <{
		date : string,
		cardCode : string,
		total : string,
		billId : string
	}>;

	private dateArray : Array <{
		date : string
	}>

	constructor( public storage : Storage,
				 public http: Http,
				 public alertCtrl: AlertController,
				 public loadingCtrl: LoadingController,
				 public toastCtrl : ToastController,
				 public navCtrl : NavController ) {}

	ionViewDidLoad() {

		this.getShopIdFromStorage();

	}

	getBills(shopId) {


		// setting parameter for http call
		const URL = 'http://sale-card.herokuapp.com/bill/all';

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = JSON.stringify({
            shopId :   shopId,
        });

        this.dataArray = [];

		this.dateArray = [];
        // call Http service
        this.http.post(URL, data, { headers: headers }).map(res => res.json()).subscribe(data => {

        	if (data.status === '12') {

 				console.log(data);
        		for (let i = 0; i < data.data.length; i++) {
    				this.dataArray.push({
    					date : data.data[i].date.toString(),
    					cardCode : data.data[i].infor.cardCode.toString(),
    					total : data.data[i].infor.total.toString(),
    					billId : data.data[i].infor.billId.toString()
    				});
    			}

        		// this.dateArray.push({
        		// 	date : this.dataArray[0].date
        		// });

        		// for (let i = 1; i <=this.dataArray.length -1; i++) {

        		// 	if ( this.dataArray[i].date === this.dataArray[i-1].date) {
        		// 		continue;
        		// 	} else {
        		// 		this.dateArray.push({
        		// 			date : this.dataArray[i].date
        		// 		})
        		// 	}
        		// }

        		// console.log(this.dateArray);

        	}

        });
	}


	getShopIdFromStorage(){

		let shopId;

		this.storage.ready().then(() => {

	         // get value 
	        this.storage.get('shopId').then((val) => {

	           shopId = val.toString();
	           this.getBills(shopId);
	        })
    	});
	}

	delete(item) {
  //       let headers = new Headers();
  //       headers.append('Content-Type', 'application/json');

  //       let data = JSON.stringify({
  //           cardId :   item.cardId,
  //       });

  //       const URL = 'http://sale-card.herokuapp.com/card/delete';

  //       let deleteLoadCtrl = this.loadingCtrl.create({
  //           content: 'Deleting ' + item.cardCode + '...',
  //       });

		// deleteLoadCtrl.present();

		// this.http.post(URL, data, { headers: headers }).map(res => res.json()).subscribe(data => {

		// 	if (data.status == '0') {
		// 		deleteLoadCtrl.dismiss();

		// 		let toastCtrl = this.toastCtrl.create({
	 //                message: item.cardCode + ' is deleted successfully!',
	 //                position: 'top',
	 //                duration: 1500
	 //            });

		// 		toastCtrl.present();

		// 		let index = this.dataArray.indexOf(item);
		// 		this.dataArray.splice(index, 1);
		// 	}

		// });
	}

	itemTapped(event, item) {
		
	    this.navCtrl.push(BillDetailPage, {
	      item : item
	    });
  	}
}