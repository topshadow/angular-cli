import { Component } from '@angular/core';
import { NavParams, AlertController, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    templateUrl: './website-list.modal.html'
})
export class WebsiteListModal {
    user: User;
    websites: FirebaseListObservable<any>;
    constructor(navParams: NavParams,
        private af: AngularFire,
        private alertCtrl: AlertController,
        private viewCtrl: ViewController
    ) {
        this.user = navParams.data;
        this.websites = this.af.database.list(`users/${this.user.username}/websites`);
    }


    addWebsite(website: Website) {
        var copyWebsite: Website = JSON.parse(JSON.stringify(website));

        this.alertCtrl.create({
            title: '二级域名',
            message: '请命名二级域名',
            inputs: [{
                name: 'SLD',
                placeholder: 'Title'
            }],
            buttons: [{
                text: '取消',
                handler: () => { console.log('取消') }
            }, {
                text: '确定',
                handler: data => {
                    copyWebsite.SLD = data.SLD;
                    delete copyWebsite.$key;
                    delete copyWebsite.$value;
                    delete copyWebsite.$exists;
                    var username = localStorage.getItem('username');
                    this.af.database.list(`users/${username}/websites/`).push(copyWebsite);
                }
            }]
        }).present();
    }
    viewWebsite(website: Website) {

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

}
