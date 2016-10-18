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
    }

    publishWebsite(website: Website) {
        var username = localStorage.getItem('username')
        website.publisher = username;
        website.publishDt = new Date().getTime();
        var copyWebsite: Website = JSON.parse(JSON.stringify(website));

        //删除副本的不必要属性
        delete copyWebsite.$key;
        delete copyWebsite.$exists;
        delete copyWebsite.$value;
        this.af.database.list(`publish`).push(copyWebsite);

        // debugger;
    }

}



