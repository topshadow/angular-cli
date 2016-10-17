import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';


@Component({
    templateUrl: './view-website.html'
})
export class ViewWebsitePage {
    website: Website;
    constructor(private navParams: NavParams, private viewCtrl: ViewController) {
        this.website = this.navParams.data;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

