import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

import { MyWebsitePage } from '../index';

@Component({
    templateUrl: './new-website-modal.html'
})
export class NewWebsiteModal {
    selectedTag: string;

    newWebsite: Website = {
        name: '', description: '',
        pages: [{ name: 'home', path: 'index', parts: [] }],
        SLD: '',
        createDt: new Date().getTime(),
        tag: '商业'
    };
    constructor(private viewCtrl: ViewController, private navCtrl: NavController, private af: AngularFire) { }

    addNewWebsite() {
        var username = localStorage.getItem('username');
        this.newWebsite.createDt = new Date().getTime();
        this.af.database.list(`users/${username}/websites`).push(this.newWebsite);
        this.dismiss();
        this.navCtrl.setRoot(MyWebsitePage);
    }

    addNewPage() {

    }

    addTag(text) {
        this.newWebsite.tag = text;

    }

    dismiss() {
        return this.viewCtrl.dismiss();
    }
}