import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PayPage } from '../pay/pay';
import { CreateCardPage } from '../card/create';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

	public shopName : string;
    public shopId : string;

    constructor(
    	public navCtrl: NavController,
        public storage: Storage
    ) {
    	// get shopName from local storage
    	this.storage.get('shopName').then((val)=>{
    		this.shopName = val;
    	});

        // get shopId from local storage
        this.storage.get('shopId').then((val)=>{
            this.shopId = val.toString();
        });
    }

    doRedirectPay() {
        this.navCtrl.setRoot(PayPage);
    }

    doRedirectCard() {
        this.navCtrl.push(CreateCardPage, this.shopId);
    }


}
