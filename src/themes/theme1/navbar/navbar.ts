import { Component, Input, ElementRef } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { EditNavbarModal } from './edit-navbar.modal';

@Component({
    selector: 'theme1-navbar',
    templateUrl: './navbar.html'
})
export class Theme1Navbar {
    @Input() data = {
        selector: '', picture: '',
        content: {
            items: [
                { type: 'number', data: '+0123 456 70 90' },
                { type: 'image', data: 'http://shapebootstrap.net/demo/html/corlate/images/logo.png' }
            ]
        }
    };

    constructor(private modalCtrl: ModalController) { }

    showEditModal(event) {
        this.modalCtrl.create(EditNavbarModal, this.data).present();
    }
}