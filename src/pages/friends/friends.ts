import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { WebsiteListModal } from './website-list.modal';

@Component({
    templateUrl: './friends.html'
})
export class FriendsPage {
    users: any = [];
    constructor(private af: AngularFire,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController
    ) {
        this.af.database.object('users').subscribe(users => {
            // debugger;
            Object.keys(users).forEach(username => {
                this.users.push(users[username]);
            })

        });
    }

    showActionSheet(user: User) {
        this.actionSheetCtrl.create({
            title: '操作',
            buttons: [{
                text: '聊天',
                role: '聊天',
                handler: () => {
                    this.alertCtrl.create({ title: "抱歉", subTitle: "聊天功能正在开发中", buttons: ['OK'] }).present();
                }
            }, {
                text: '查看网站',
                role: '查看网站',
                handler: () => {
                    this.modalCtrl.create(WebsiteListModal, user).present();
                }
            }
            ]
        }).present();
    }


}