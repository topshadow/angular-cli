import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController, ModalController } from 'ionic-angular';
import { EditPartModal } from './edit-part.modal';

@Component({
    templateUrl: './view-website.html'
})
export class ViewWebsitePage {
    website: Website;
    currentPage: Page;
    constructor(private navParams: NavParams,
        private viewCtrl: ViewController,
        private modalCtrl: ModalController
    ) {
        this.website = this.navParams.data;
        this.currentPage = this.website.pages[0];
        debugger;
    }
    ngOnInIt() {

    }
    tap(event) {
        console.log(event);
    }
    openEditPartModal(part: Part) {
        this.modalCtrl.create(EditPartModal, part).present();
    }

    dismiss() {

        this.viewCtrl.dismiss();
    }
}

