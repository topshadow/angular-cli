import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { NavParams, ModalController } from 'ionic-angular';
import { NewPageModal } from './new-page.modal';
import { ViewWebsitePage } from './view-website';

@Component({
    templateUrl: './edit-website.html'
})
export class EditWebsitePage {
    website: Website;
    selectedPage: Page;
    currentPage: Page;
    optionParts: Part[] = [{ name: 'theme1-navbar', picture: 'assets/images/1.png' },
    { name: 'theme1-navbar', picture: 'assets/images/1.png' },
    { name: 'theme1-carousel', picture: 'assets/images/2.png' },
    { name: 'theme1-skill', picture: 'assets/images/3.png' }
    ];

    constructor(private navParams: NavParams, private modalCtrl: ModalController, private af: AngularFire) {
        this.checkWebsite();
    }


    checkWebsite() {
        var passWebsite = this.navParams.data;
        var username = localStorage.getItem('username');
        this.af.database
            .object(`users/${username}/websites/${passWebsite.$key}`)
            .subscribe(website => {
                this.website = website;
                this.currentPage = this.website.pages[0];
                if (this.currentPage.parts == null || this.currentPage.parts == undefined) {
                    this.currentPage.parts = [];
                }
            });
    }

    addPage() {
        this.modalCtrl.create(NewPageModal, this.website, { showBackdrop: true, enableBackdropDismiss: true }).present();

    }

    consoleWebsite() {
        console.log(this.website);
    }

    viewWebsite() {
        this.modalCtrl.create(ViewWebsitePage, this.website).present();
    }

    // 保存在历史版本,并记录操作日期
    savePage() {
        var username = localStorage.getItem('username');
        /** 因为通过 async 添加了一些 例如 val(),
         * 等函数,不方便上传,但是使用 {name:this.website.name}依次填写属性值,
         * 不方便后期扩展website的值,所以遍历对像的值属性,并上传
         *delete 和 undefined 的区别
         */

        this.af.database.object(`users/${username}/websites/${this.website.$key}`).update({ pages: this.website.pages });
        // .subscribe(website => {
        // console.log(website);
        // })
        // .set(this.website)
        // .then(s => { console.log(s) });
    }
}


