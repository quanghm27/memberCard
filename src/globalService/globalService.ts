import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

  public globalVar: string = '';

  constructor() {
  	this.globalVar = "";
  }

}