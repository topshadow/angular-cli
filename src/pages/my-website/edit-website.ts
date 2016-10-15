import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    templateUrl: './edit-website.html'
})
export class EditWebsitePage {
    website: Website;
    constructor(private navParams: NavParams) {
        this.website = this.navParams.data;
    }

}
