import { PcFriends } from '../pc-friends/pc-friends';
import { PcFriendsWebsiteModal } from '../pc-friends/pc-friends-website.modal';
import { Component } from '@angular/core';
import { ModalController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { obj2Arr } from '../pc-friends/pc-friends';

@Component({
    selector: 'pc-template-shop',
    templateUrl: './pc-template-shop.html'
})
export class PcTemplateShop {
    publish: FirebaseListObservable<any>;
    constructor(private af: AngularFire,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController
    ) {
        this.publish = this.af.database.list('publish');
    }

    preview(website: Website) {
        this.modalCtrl.create(PcFriendsWebsiteModal, website).present();
    }

    add(website: Website) {
        var copyWebsite = <Website>JSON.parse(JSON.stringify(website));
        delete copyWebsite.$key;
        delete copyWebsite.$value;
        delete copyWebsite.$exists;
        this.promptSLD(copyWebsite);

    }
    promptSLD(website: Website) {
        this.alertCtrl.create({
            title: '二级域名',
            subTitle: '二级域名',
            inputs: [{
                type: 'text',
                name: 'SLD',
                label: '二级域名'
            }],
            buttons: [{ text: '取消' }, {
                text: '确定',
                handler: data => {
                    var username = localStorage.getItem('username');
                    website.SLD = data.SLD;
                    this.af.database.list(`users/${username}/websites`).push(website);
                }
            }]
        }).present();
    }

    viewPublisher(publisher: string) {
        this.af.database.object(`users/${publisher}`).subscribe(user => {

            var selectWebsiteAlert = this.alertCtrl.create();
            selectWebsiteAlert.setTitle('选择预览的网站');
            selectWebsiteAlert.setSubTitle('用户网站的二级域名');
            for (var website of obj2Arr(user.websites)) {
                selectWebsiteAlert.addInput({
                    type: 'radio',
                    label: website.SLD,
                    value: website,
                    checked: false
                });
            }
            selectWebsiteAlert.addButton('取消');
            selectWebsiteAlert.addButton({
                text: '确定', handler: data => {
                    console.log(data);
                    this.modalCtrl.create(PcFriendsWebsiteModal, data).present();
                }
            });
            selectWebsiteAlert.present();

        });
    }

    like() {

    }
}