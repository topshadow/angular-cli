import { PcSignIn } from '../pc-sign-in/pc-sign-in';
import { PcSignUp } from '../pc-sign-up/pc-sign-up';
import { PcTemplateShop } from '../pc-template-shop/pc-template-shop';
import { PcMyWebsite } from '../pc-my-website/pc-my-website';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PcFriends } from '../pc-friends/pc-friends';
import { MainPage } from '../index';

@Component({
    selector: 'pc-nav',
    templateUrl: './pc-nav.html',
    styleUrls: ['./pc-nav.scss']
})
export class PcNav {

    pages: Component[] = [MainPage, PcMyWebsite, PcTemplateShop, PcFriends];
    constructor(private navCtrl: NavController) { }
    toSignIn() {
        this.navCtrl.setRoot(PcSignIn);
    }
    toSignUp() {
        this.navCtrl.setRoot(PcSignUp)
    }
    openPage(page: Component) {
        this.navCtrl.setRoot(page);
    }
}