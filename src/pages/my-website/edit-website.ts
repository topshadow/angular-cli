// 主题标签页

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
    optionParts: Part[] = [
        { selector: 'theme1-navbar', picture: 'assets/images/theme1-navbar.png' },
        { selector: 'theme1-carousel', picture: 'assets/images/theme1-carousel.png' },
        { selector: 'theme1-service', picture: 'assets/images/theme1-service.png' },
        { selector: 'theme1-recent-works', picture: 'assets/images/theme1-recent-works.png' },
        { selector: 'theme1-footer', picture: 'assets/images/theme1-footer.png' }
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
        this.savePage()
        this.modalCtrl.create(ViewWebsitePage, this.website).present();
    }

    /**
     * 保存在历史版本,并记录操作日期
     * @memberOf EditWebsitePage
     */
    savePage() {
        var username = localStorage.getItem('username');
        this.af.database.object(`users/${username}/websites/${this.website.$key}`).update({ pages: this.website.pages });
    }
}


