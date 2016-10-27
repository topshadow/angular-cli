import { Component } from '@angular/core';
import { MenuController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
@Component({
    templateUrl: './pc-view-my-website.html'
})
export class PcViewMyWebsite {
    currentPage: Page;
    website: Website;
    constructor(private menuCtrl: MenuController,
        navParams: NavParams,
        private viewCtrl: ViewController,
        private alertCtrl: AlertController,
        private af: AngularFire
    ) {
        this.website = navParams.data;
        this.currentPage = this.website.pages[0];

    }
    openMenu() {
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
}