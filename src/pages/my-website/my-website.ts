import { EditWebsitePage } from './edit-website';
import { Component } from '@angular/core';
import { ModalController, NavController, AlertController } from 'ionic-angular';
import { NewWebsiteModal } from './new-website-modal';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ViewWebsitePage } from './view-website';
import { PublishWebsiteModal } from './publish-website.modal';

@Component({
    templateUrl: './my-website.html'
})
export class MyWebsitePage {
    username: string;
    websites: FirebaseListObservable<any>;
    constructor(private modalCtrl: ModalController,
        private af: AngularFire,
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {
        this.username = localStorage.getItem('username');
        this.websites = this.af.database.list(`users/${this.username}/websites`);
    }

    removeWebsite($key: string) {
        this.websites.remove($key);
    }

    viewWebsite(website: Website) {
        this.modalCtrl.create(ViewWebsitePage, website).present();
    }

    editWebsite(website: Website) {
        this.modalCtrl.create(EditWebsitePage, website).present();
    }

    showNewWebsiteModal() {
        this.modalCtrl.create(NewWebsiteModal).present();
    }

    publishWebsite(website: Website) {
        // 发布留言
        this.modalCtrl.create(PublishWebsiteModal, website).present();
    }

    copyAddress(addressParams: { username: string, SLD: string }) {
        this.alertCtrl.create({
            title: '复制网站地址', message: '复制成功,快分享给你的小伙伴吧', buttons: [{
                text: '去查看',
                role: '去查看',
                handler: () => {
                    window.open(`/${addressParams.username}/${addressParams.SLD}`);
                }
            }, {
                text: '返回',
                role: '返回',
                handler: () => {

                }
            }
            ]
        }).present();
    }

}



