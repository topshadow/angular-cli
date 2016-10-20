import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, Nav } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Page404 } from '../../app/index';

// 根据用户名和二级域名来解析用户网站  /username/SLD
@Component({
    templateUrl: './every-page-preview.html'
})
export class EveryPagePreview {
    website: Website;
    currentPage: Page;

    constructor(private nav: Nav, navParams: NavParams, private af: AngularFire) {
        var {username, SLD} = navParams.data;

        this.af.database.list(`users/${username}/websites`, {
            query: {
                orderByChild: 'SLD',
                equalTo: SLD
            }
        }).subscribe(websites => {
            this.website = websites[0];
            // 未查找到对应的网站,则404错误
            if (!this.website) {
                this.nav.setRoot(Page404);
            }

            this.currentPage = this.website.pages[0];

        });
    }

    tap(event) {
        console.log(event)
    }
}