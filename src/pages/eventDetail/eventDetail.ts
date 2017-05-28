import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
// import { CardEditPage } from '../cardEdit/cardEdit'; 

@Component({
    selector: 'page-eventDetail',
    templateUrl: 'eventDetail.html',
})
export class EventDetailPage {

    public shopName: string;
    public event;
    public eventData: Array < {
        productCode: string,
        bonusPoint: string
    } > ;

    constructor(public storage: Storage,
        public params: NavParams,
        public http: Http) {

        this.storage.get('shopName').then((val) => {
            this.shopName = val;
        });

        this.storage.get('shopId').then((val) => {
            this.shopName = val;
        });

        this.event = this.params.get('item');
    }

    ionViewDidLoad() {
        let url = 'http://sale-card.herokuapp.com/event/detail';

        let data = JSON.stringify({

            bonusId: this.event.eventId
        });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.eventData = [];
        
        this.http.post(url, data, { headers: headers }).map(res => res.json()).subscribe(data => {

            if (data.status === '0') {
                // get data and store to array
                for (let i = 0; i < data.data.eventData.length; i++) {

                    this.eventData.push({
                        productCode: data.data.eventData[i].productCode,
                        bonusPoint : data.data.eventData[i].bonusPoint
                    });
                }
            }
        });
    }
}
