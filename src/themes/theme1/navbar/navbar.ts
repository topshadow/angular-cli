import { Component, Input, ElementRef } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EditNavbarModal } from './edit-navbar.modal';

@Component({
    selector: 'theme1-navbar',
    templateUrl: './navbar.html'
})
export class Theme1Navbar {
    @Input() data = {
        content: {
            phone: '+0123 456 70 90'
        }
    };

    constructor(private modalCtrl: ModalController) { }

    showEditModal(event) {
        this.modalCtrl.create(EditNavbarModal, this.data).present();
    }
}