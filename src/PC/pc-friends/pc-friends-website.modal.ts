import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
@Component({
    templateUrl: './pc-friends-website.modal.html'
})
export class PcFriendsWebsiteModal {
    website: Website;
    currentPage: Page;
    constructor(private navCtrl: NavController,
        private navParams: NavParams,
        private viewCtrl: ViewController,
        private af: AngularFire,
        private alertCtrl: AlertController
    ) {
        this.website = navParams.data;
        this.currentPage = this.website.pages[0];
        debugger;
    }

    addWebsite() {

        var copyWebsite = <Website>JSON.parse(JSON.stringify(this.website));
        delete copyWebsite.$key;
        delete copyWebsite.$value;
        delete copyWebsite.$exists;
        this.promptSLD(copyWebsite);

    }
    promptSLD(website: Website) {
        var username = localStorage.getItem('username');

        this.alertCtrl.create({
            title: '自定义二级域名',
            message: '输入二级域名',
            inputs: [{
                type: 'text',
                label: '二级域名',
                name: 'SLD'
            }],
            buttons: [{ text: '取消' }, {
                text: '确定', handler: data => {
                    website.SLD = data.SLD;
                    this.af.database.list(`users/${username}/websites`).push(website);
                }
            }]
        }).present();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}