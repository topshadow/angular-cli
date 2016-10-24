import { PcEditWebsite } from '../pc-edit-website/pc-edit-website';
import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavParams, NavController, AlertController } from 'ionic-angular';

@Component({
    selector: 'pc-my-website',
    templateUrl: './pc-my-website.html'
})
export class PcMyWebsite {
    user: User;
    websites: FirebaseListObservable<any>;

    constructor(private af: AngularFire,
        navParams: NavParams,
        private navCtrl: NavController,
        private alertCtrl: AlertController
    ) {
        this.user = navParams.data;
        this.websites = this.af.database.list(`users/${this.user.username}/websites`);

    }

    publishWebsite() {

    }
    editWebsite(website: Website) {
        this.navCtrl.setRoot(PcEditWebsite, website);
    }

    action(website: Website) {
        var radioAlert = this.alertCtrl.create();
        radioAlert.setTitle('操作网站');
        radioAlert.addButton('取消');
        radioAlert.addInput({
            type: 'radio',
            label: '发布',
            value: '发布',
            checked: true
        });
        radioAlert.addInput({
            type: 'radio',
            label: '编辑',
            value: '编辑',
            checked: false
        });
        radioAlert.addInput({
            type: 'radio',
            label: '删除',
            value: '删除',
            checked: false
        });
        radioAlert.addButton({
            text: '确定',
            handler: data => {
                switch (data) {
                    case "发布":
                        this.promptSLD();
                        break;
                    case "编辑":
                        this.editWebsite(website);
                        break;
                    case "删除":
                        this.deleteWebsite(website);
                        break;
                }
            }
        });
        radioAlert.present();
    }

    // 输入二级域名    
    promptSLD() {
        this.alertCtrl.create({
            title: '自定义二级域名',
            message: '请输入二级域名',
            inputs: [{
                name: 'SLD',
                placeholder: '二级域名'
            }],
            buttons: [{
                text: '取消',

            }, {
                text: '保存',
                handler: data => {
                    data.SLD;
                    // 上传保存页面
                    console.log(data);
                }
            }]
        }).present();

    }

    deleteWebsite(website: Website) {

    }

}