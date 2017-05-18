import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-cardEdit',
    templateUrl: 'cardEdit.html',
})
export class CardEditPage {

	public card;

	constructor (
		public params: NavParams
	) {
		this.card = this.params.get('item'); 
	}

	doEditCard () {

	}
}
