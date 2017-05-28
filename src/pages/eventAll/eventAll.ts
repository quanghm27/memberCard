import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { EventDetailPage } from '../eventDetail/eventDetail';
import { EventAddPage } from '../eventAdd/eventAdd';

@Component({
    selector: 'page-eventAll',
    templateUrl: 'eventAll.html',
})
export class EventsPage {

    public shopId;

    private dataArray: Array < {
        eventId: string,
        eventType: string,
        delFlg: string,
        startDate: string,
        endDate: string,
        eventName: string
    } > ;

    constructor(public storage: Storage,
    			public http : Http,
    			public navCtrl: NavController) {
        
    }


    ionViewDidLoad() {

        this.getShopIdFromStorage();

    }


    getShopIdFromStorage() {

        let shopId;

        this.storage.ready().then(() => {

            // get value 
            this.storage.get('shopId').then((val) => {

                shopId = val.toString();
                this.getEvents(shopId);
            })
        });
    }

    getEvents(shopId) {

    	let url = 'http://sale-card.herokuapp.com/event/all';

    	let data = JSON.stringify({
    		shopId : shopId
    	});

    	let headers = new Headers();
    	headers.append('Content-Type', 'application/json');

    	this.dataArray = [];

    	this.http.post(url, data, {headers : headers}).map(res => res.json()).subscribe(data => {

    		if (data.status === '0') {
    			for (let i = 0; i < data.data.length; i++) {
        			this.dataArray.push({
        				eventId: data.data[i].id,
						eventType: data.data[i].bonus_type ,
						delFlg: data.data[i].del_flg,
						startDate : data.data[i].start_date,
						endDate : data.data[i].end_date,
						eventName : data.data[i].bonus_name
        			});
        		}
    		} else {
    			console.log('recieve data err');
    		}
    	});

    }

    itemTapped(event, item){

    	this.navCtrl.push(EventDetailPage, {
	      item : item
	    });
    }

    redirectAddEvent(){
        this.navCtrl.push(EventAddPage);   
    }
}
