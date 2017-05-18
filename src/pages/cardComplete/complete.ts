import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';

@Component({
    selector: 'page-card',
    templateUrl: 'complete.html',
})
export class CardCompletePage {
	constructor() {}

	ionViewDidLoad() {
		console.log('a');
	}
	
}