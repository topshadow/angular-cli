// 主题标签页
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { NavParams, ModalController, AlertController, ViewController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { NewPageModal } from './new-page.modal';
import { ViewWebsitePage } from './view-website';


var getOptionPartgs = (): Part[] => {
    return [
        {
            selector: 'theme1-navbar', picture: 'assets/images/1.png',
            content: {
                // 所有的数据,可以存为数组类型
                items: [
                    { type: 'number', description: '联系号码', data: '+0123 456 70 90' },
                    { type: 'image', description: '网站logo', data: 'http://shapebootstrap.net/demo/html/corlate/images/logo.png' }
                ]
            }
        },
        { selector: 'theme1-carousel', picture: 'assets/images/theme1-carousel.png' },
        { selector: 'theme1-service', picture: 'assets/images/theme1-service.png' },
        { selector: 'theme1-recent-works', picture: 'assets/images/theme1-recent-works.png' },
        { selector: 'theme1-footer', picture: 'assets/images/theme1-footer.png' }
    ];
}

@Component({
    templateUrl: './edit-website.html'
})
export class EditWebsitePage implements OnDestroy {
    website: Website;
    selectedPage: Page;
    currentPage: Page;
    optionParts: Part[] = getOptionPartgs();

    constructor(private navParams: NavParams,
        private modalCtrl: ModalController,
        private af: AngularFire,
        private dragulaService: DragulaService,
        private alertCtrl: AlertController,
        private viewCtrl: ViewController
    ) {
        this.checkWebsite();
        // dragulaService.op
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

    ngOnDestroy() {
        this.dragulaService.destroy('drag-part');
    }
    private onDrag(args) {
        let [e, el] = args;
        console.log(e, el);
    }

    private onDrop(args) {
        let [e, el] = args;
        console.log(e, el);
        this.optionParts = getOptionPartgs();
    }

    private onOver(args) {
        let [e, el] = args;
        console.log(e, el);
    }
    private onOut(args) {
        let [e, el] = args;
        console.log(e, el);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    checkWebsite() {
        var passWebsite = this.navParams.data;
        var username = localStorage.getItem('username');
        this.af.database
            .object(`users/${username}/websites/${passWebsite.$key}`)
            .subscribe(website => {
                this.website = website;
                this.currentPage = this.website.pages[0];
                if (this.currentPage.parts == null || this.currentPage.parts == undefined) {
                    this.currentPage.parts = [];
                }
            });
    }

    addPage() {
        this.modalCtrl.create(NewPageModal, this.website, { showBackdrop: true, enableBackdropDismiss: true }).present();

    }

    consoleWebsite() {
        console.log(this.website);
    }

    viewWebsite() {
        // this.savePage()
        this.modalCtrl.create(ViewWebsitePage, this.website).present();
    }

    /**
     * 保存在历史版本,并记录操作日期
     * @memberOf EditWebsitePage
     */
    savePage() {
        var username = localStorage.getItem('username');
        this.af.database.object(`users/${username}/websites/${this.website.$key}`).update({ pages: this.website.pages }).then(() => {
            let confirm = this.alertCtrl.create({
                title: '保存成功',
                buttons: [{
                    text: '确定',
                    handler: () => { }
                }]
            }).present();

        });
    }
}


