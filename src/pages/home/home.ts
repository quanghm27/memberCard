import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PayPage } from '../pay/pay';
import { CreateCardPage } from '../card/create';
import { CardsPage } from '../cardAll/cards';
import { BillAllPage } from '../billAll/billAll';
import { EventsPage } from '../eventAll/eventAll';

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



    doRedirectCards() {
        this.navCtrl.push(CardsPage, this.shopId);
    }


    doRedirectCard() {
        this.navCtrl.push(CreateCardPage, this.shopId);
    }

    doRedirectBills() {
        this.navCtrl.push(BillAllPage);
    }

        doRedirectPay() {
        this.navCtrl.push(PayPage);
    }

     doRedirectEvents() {
        this.navCtrl.push(EventsPage);
    }
    
}
