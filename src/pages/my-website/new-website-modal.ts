import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    templateUrl: './new-website-modal.html'
})
export class NewWebsiteModal {

    newWebsite: Website = { name: '', description: '', data: { pages: [] }, SLD: '', createDt: new Date().getTime() };
    constructor(private viewCtrl: ViewController, private af: AngularFire) { }

    addNewWebsite() {
        var username = localStorage.getItem('username');
        this.newWebsite.createDt = new Date().getTime();
        this.af.database.list(`users/${username}/websites`).push(this.newWebsite);
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
}