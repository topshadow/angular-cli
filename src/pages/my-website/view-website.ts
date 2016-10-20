import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';


@Component({
    templateUrl: './view-website.html'
})
export class ViewWebsitePage {
    website: Website;
    currentPage: Page;
    constructor(private navParams: NavParams, private viewCtrl: ViewController) {
        this.website = this.navParams.data;
        this.currentPage = this.website.pages[0];
        debugger;
    }
    ngOnInIt() {

    }
    tap(event) {
        console.log(event);
    }

    dismiss() {

        this.viewCtrl.dismiss();
    }
}

