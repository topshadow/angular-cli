import { EditWebsitePage } from './edit-website';
import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { NewWebsiteModal } from './new-website-modal';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ViewWebsitePage } from './view-website';

@Component({
    templateUrl: './my-website.html'
})
export class MyWebsitePage {
    websites: FirebaseListObservable<any>;
    constructor(private modalCtrl: ModalController,
        private af: AngularFire,
        private navCtrl: NavController) {
        var username = localStorage.getItem('username');
        this.websites = this.af.database.list(`users/${username}/websites`);
    }

    removeWebsite($key: string) {
        this.websites.remove($key);
    }

    viewWebsite(website: Website) {
        this.navCtrl.push(ViewWebsitePage, website);
    }

    editWebsite(website: Website) {
        this.navCtrl.push(EditWebsitePage, website);
    }

    showNewWebsiteModal() {

        this.modalCtrl.create(NewWebsiteModal).present();
        console.log('显示创建界面')
    }

}



