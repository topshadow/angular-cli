import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    templateUrl: './view-website.html'
})
export class ViewWebsitePage {
    website: Website;
    constructor(private navParams: NavParams) {
        this.website = this.navParams.data;
    }
}

