import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { CardEditPage } from '../cardEdit/cardEdit'; 

@Component({
    selector: 'page-cards',
    templateUrl: 'cards.html',
})
export class CardsPage {

	private shopId : string

	private dataArray : Array <{
		cardId: number,
		cardCode: String,
		guestName: string,
		phoneNumber : number,
		points : number
	}>;

	constructor( public storage : Storage,
				 public http: Http,
				 public alertCtrl: AlertController,
				 public loadingCtrl: LoadingController,
				 public toastCtrl : ToastController,
				 public navCtrl : NavController ) {

		this.storage.get('shopId').then((val) =>{
			this.shopId = val.toString()
		})
	}

	ionViewDidLoad() {

		this.getShopIdFromStorage();

	}

	getCards(shopId) {


		// setting parameter for http call
		const URL = 'http://sale-card.herokuapp.com/card/all';

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = JSON.stringify({
            shopId :   shopId,
        });

        this.dataArray = [];

        // call Http service
        this.http.post(URL, data, { headers: headers }).map(res => res.json()).subscribe(data => {


        	if (data.status === '0') {

        		for (let i = 0; i < data.data.length; i++) {
        			this.dataArray.push({
        				cardId: data.data[i].cardId,
						cardCode: data.data[i].cardCode ,
						guestName: data.data[i].guestName,
						phoneNumber : data.data[i].phoneNumber.toString(),
						points : data.data[i].points
        			});
        		}
        	}

        });
	}

	getShopIdFromStorage(){

		let shopId;

		this.storage.ready().then(() => {

	         // get value 
	        this.storage.get('shopId').then((val) => {

	           shopId = val.toString();
	           this.getCards(shopId);
	        })
    	});
	}

	delete(item) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data = JSON.stringify({
            cardId :   item.cardId,
        });

        const URL = 'http://sale-card.herokuapp.com/card/delete';

        let deleteLoadCtrl = this.loadingCtrl.create({
            content: 'Deleting ' + item.cardCode + '...',
        });

		deleteLoadCtrl.present();

		this.http.post(URL, data, { headers: headers }).map(res => res.json()).subscribe(data => {

			if (data.status == '0') {
				deleteLoadCtrl.dismiss();

				let toastCtrl = this.toastCtrl.create({
	                message: item.cardCode + ' is deleted successfully!',
	                position: 'top',
	                duration: 1500
	            });

				toastCtrl.present();

				let index = this.dataArray.indexOf(item);
				this.dataArray.splice(index, 1);
			}

		});
	}

	itemTapped(event, item) {
		
		console.log(item);
	    this.navCtrl.push(CardEditPage, {
	      item : item
	    });
  	}


  	searchCards(ev: any){

  		let val = ev.target.value;
  		console.log(val);

  		let url = 'http://sale-card.herokuapp.com/card/search';

  		let headers = new Headers();
  		headers.append('Content-Type', 'application/json');

  		let data = JSON.stringify({
            keyWord :  val,
            shopId : this.shopId
        });

  		console.log(data);

  		this.dataArray = [];
  		
        this.http.post(url, data, { headers: headers }).map(res => res.json()).subscribe(data => {

        	if (data.status === '0') {

        		for (let i = 0; i < data.data.length; i++) {
        			this.dataArray.push({
        				cardId: data.data[i].cardId,
						cardCode: data.data[i].cardCode ,
						guestName: data.data[i].guestName,
						phoneNumber : data.data[i].phoneNumber.toString(),
						points : data.data[i].points
        			});
        		}
        	}
        });
  	}
}