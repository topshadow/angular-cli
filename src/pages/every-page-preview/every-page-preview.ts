import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams } from 'ionic-angular';

@Component({
    templateUrl: './every-page-preview.html'
})
export class EveryPagePreview {
    constructor() {
        if (window.location.pathname) {
            console.log(window.location.pathname);
        }
    }
}