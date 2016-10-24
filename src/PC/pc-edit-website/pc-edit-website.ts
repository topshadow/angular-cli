import { Theme1Service } from '../../themes';
import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import {
    NavController, NavParams, Nav,
    Menu, AlertController, ModalController
} from 'ionic-angular';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { PcViewMyWebsite } from './pc-view-my-website';
import { getOptionParts } from '../../pages/index';
import { AngularFire } from 'angularfire2';

@Component({
    templateUrl: './pc-edit-website.html'
})
export class PcEditWebsite implements AfterViewInit, OnDestroy {

    @ViewChild(Menu) menu: Menu;
    website: Website;
    currentPage: Page;
    optionParts: Part[] = getOptionParts();
    constructor(private navCtrl: NavController,
        navParams: NavParams,
        private dragulaService: DragulaService,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private af: AngularFire
    ) {
        this.website = navParams.data;
        this.currentPage = this.website.pages[0];
        dragulaService.setOptions('drag-part', {
            removeOnSpill: true
        });

        dragulaService.drag.subscribe(value => {
            console.log(`drag${value[0]}`);
            this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe(value => {
            console.log(`drop${value[0]}`);
            this.onDrop(value.slice(1));
        });
        dragulaService.over.subscribe(value => {
            console.log(`over${value[0]}`);
            this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe(value => {
            console.log(`out${value[0]}`);
            this.onOut(value.slice(1));
        });
    }

    ngAfterViewInit() {


    }
    viewMyWebsite() {
        this.modalCtrl.create(PcViewMyWebsite, this.website).present();
    }
    saveMyWebsite() {
        var username = localStorage.getItem('username');
        this.af.database.object(`users/${username}/websites/${this.website.$key}`).update({ pages: this.website.pages }).then(() => {
            let confirm = this.alertCtrl.create({
                title: '保存成功',
                buttons: [{
                    text: '确定'
                }]
            }).present();

        });
    }
    ngOnDestroy() {
        this.dragulaService.destroy('drag-part');
    }

    private onDrag(args) {
        let [e, el] = args;
        console.log(e, el);
        this.optionParts = getOptionParts();
    }

    private onDrop(args) {
        let [e, el] = args;
        console.log(e, el);
        this.optionParts = getOptionParts();
    }

    private onOver(args) {
        let [e, el] = args;
        console.log(e, el);
    }
    private onOut(args) {
        let [e, el] = args;
        console.log(e, el);
        this.optionParts = getOptionParts();
    }




}