import { Component, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    templateUrl: './custom-plugin.html'
})
export class CustomPlugin {
    plugin: MyPlugin = { HTML: '', selector: 'custom-plugin' };
    trustedHTML;
    publishPlugins: FirebaseListObservable<any>;

    constructor(private el: ElementRef,
        private domSafe: DomSanitizer,
        private af: AngularFire
    ) {
        this.publishPlugins = this.af.database.list(`plugin`);

    }
    changeView(html: string) {
        this.plugin.HTML = html;
        this.trustedHTML = this.domSafe.bypassSecurityTrustHtml(html);
        debugger;
    }

    upload() {
        this.plugin.selector = "custom-plugin";
        this.af.database.list('plugin').push(this.plugin);
    }
}