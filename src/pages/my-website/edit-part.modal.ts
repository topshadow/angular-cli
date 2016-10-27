import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: './edit-part.modal.html'
})
export class EditPartModal {
    data: Part;
    constructor(private viewCtrl: ViewController,
        private navParams: NavParams
    ) {
        this.data = this.navParams.data;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    consoleData() {
        console.log(this.data);
    }
}