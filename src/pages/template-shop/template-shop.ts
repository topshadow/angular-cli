
import { Component, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
import { ModalController, AlertController } from 'ionic-angular';

import { ViewWebsitePage, WebsiteListModal } from '../index';


@Component({
    templateUrl: './template-shop.html'
})
export class TemplateShop implements AfterViewInit {
    publishTemplates: FirebaseListObservable<any>;
    tagSubject: Subject<any>;

    filterByTag(tag: string) {
        this.tagSubject.next(tag);
    }

    constructor(private af: AngularFire,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController) {
        this.tagSubject = new Subject();
        this.publishTemplates = this.af.database.list('publish', {
            query: {
                orderByChild: 'tag',
                equalTo: this.tagSubject
            }
        });
    }

    viewWebsite(website: Website) {
        this.modalCtrl.create(ViewWebsitePage, website).present();
    }

    addWebsite(website: Website) {
        this.alertCtrl.create({
            title: '添加到我的站点',
            message: '自定义二级域名',
            inputs: [{ name: 'SLD', placeholder: '二级域名' }],
            buttons: [{
                text: '确定',
                role: '确定',
                handler: data => {
                    let username = localStorage.getItem('username');
                    let copyWebsite: Website = JSON.parse(JSON.stringify(website));
                    copyWebsite.SLD = data.SLD;
                    delete copyWebsite.$exists;
                    delete copyWebsite.$key;
                    delete copyWebsite.$value;
                    this.af.database.list(`users/${username}/websites`).push(copyWebsite);
                }
            }, {
                text: '取消',
                role: '取消',
                handler: () => { }
            }]
        }).present();
    }

    viewPublisher(publisher: string) {
        this.af.database.object(`users/${publisher}`).subscribe(user => {
            this.modalCtrl.create(WebsiteListModal, user).present();
        });

    }

    leaveMessage() {
        this.alertCtrl.create({
            title: "抱歉", message: '该功能暂未开放', buttons: [{
                text: '确定',
                role: '确定',
                handler: () => { }
            }]
        }).present();
    }

    like() {
        this.alertCtrl.create({
            title: "抱歉", message: '该功能暂未开放', buttons: [{
                text: '确定',
                role: '确定',
                handler: () => { }
            }]
        }).present();
    }

    ngAfterViewInit() {
        this.tagSubject.next(undefined);
    }
}
