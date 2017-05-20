import { Component } from '@angular/core';
import { NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-cardEdit',
    templateUrl: 'cardEdit.html',
})
export class CardEditPage {

	public card;

	constructor (
		public params: NavParams,
		public alertCtrl : AlertController,
		public loadingCtrl : LoadingController,
		public toastCtrl : ToastController,
		public http: Http,
	) {
		this.card = this.params.get('item'); 
	}

	doEditCard () {

		let URL = 'http://sale-card.herokuapp.com/card/update';

		let header = new Headers();
		header.append('Content-Type', 'application/json');

		let data = JSON.stringify({
			cardId : this.card.cardId,
			guestName : this.card.guestName,
			phoneNumber : this.card.phoneNumber
		});

		let loading = this.loadingCtrl.create({
			content : 'Updating' + this.card.cardCode + ' ...'
		});

		loading.present();

		this.http.post ( URL , data, {headers : header}).map(res => res.json()).subscribe(data => {

			loading.dismiss();
			if (data.status == '0') {

				// Case card update ok
				let toast = this.toastCtrl.create({
	                message: this.card.cardCode + ' is updated successfully!',
	                position: 'top',
	                duration: 1500
	            });

				toast.present();
			} else {
				// case error input validated in server
				let alert = this.createMessage('Error', data.message);
				alert.present();
			}
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
}
