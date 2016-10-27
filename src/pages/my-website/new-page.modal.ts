import { Component } from '@angular/core';
import {
    ViewController,
    NavParams,
    ActionSheetController,
    ToastController
} from 'ionic-angular';
import { AngularFire } from 'angularfire2';

@Component({
    templateUrl: './new-page.modal.html'
})
export class NewPageModal {
    website: Website;
    newPage: Page = {
        name: '', path: '',
        parts: [
            {
                selector: 'theme1-navbar', picture: 'assets/images/1.png',
                content: {
                    data: [
                        { type: 'number', description: '联系号码', phone: '+0123 456 70 90' },
                        { type: 'image', description: '网站logo', logo: 'http://shapebootstrap.net/demo/html/corlate/images/logo.png' }
                    ]
                }
            }
        ]
    };


    selectedTag: string;
    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private af: AngularFire,
        private actionSheetCtrl: ActionSheetController,
        private toastCtrl: ToastController
    ) {
        this.website = this.navParams.data;
    }


    addPage() {
        // 判断是否已经有该路径页面存在,若已经存在,则提醒用户,页面存在，用新的页面名称替换旧的页面名称
        var isExistTheSamePage = this.website.pages.some((page: Page, index: number, pages: Page[]) => {
            return page.path == this.newPage.path;
        });
        if (isExistTheSamePage) {
            this.toastCtrl.create({ message: '当前页面已经存在', duration: 3000 }).present();
            return false;
        } else {
            this.website.pages.push(this.newPage);
            var username = localStorage.getItem('username');
            this.af.database.object(`users/${username}/websites/${this.website.$key}/pages`).set(this.website.pages);
        }



    }

    editPage(page: Page) {
        this.newPage = page;
    }

    deletePage(page: Page) {
        var index = this.website.pages.indexOf(page);
        this.website.pages.splice(index, 1);
    }

    dismiss() {
        return this.viewCtrl.dismiss();
    }
}