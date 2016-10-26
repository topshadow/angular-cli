import { PcFriendsWebsiteModal } from './pc-friends-website.modal';
import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AlertController, ModalController } from 'ionic-angular';

export var obj2Arr = (obj) => {
    var arr = [];
    for (var key in obj) {
        arr.push(obj[key]);
    }
    return arr;
}

@Component({
    selector: 'pc-friends',
    templateUrl: './pc-friends.html'
})
export class PcFriends {
    users: User[] = [];
    constructor(private af: AngularFire,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController
    ) {
        this.af.database.object('users').subscribe(users => {
            // 过滤掉 $key,$exists
            Object.keys(users).filter(key => {
                return key != '$key' && key != '$exists';
            }).forEach(username => {
                this.users.push(users[username]);
            });
            debugger;
        });

    }

    talkTo(user: User) { }

    viewWebsite(user: User) {
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
    }

}