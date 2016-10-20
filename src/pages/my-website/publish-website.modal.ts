import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

@Component({
    templateUrl: './publish-website.modal.html'
})
export class PublishWebsiteModal {
    description: string;
    tag: string;
    website: Website;
    constructor(navParams: NavParams,
        private af: AngularFire,
        private viewCtrl: ViewController
    ) {
        this.website = navParams.data;
    }

    publish() {
        // 对副本进行操作并上传副本
        let username = localStorage.getItem('username');
        let copyWebsite: Website = JSON.parse(JSON.stringify(this.website));
        delete copyWebsite.$exists;
        delete copyWebsite.$key;
        delete copyWebsite.$value;

        copyWebsite.publisher = username;
        copyWebsite.publishDt = new Date().getTime();
        copyWebsite.tag = this.tag;
        copyWebsite.description = this.description;
        this.af.database.list(`publish`).push(copyWebsite);

    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}