import { Component, AfterViewInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';
@Component({
    templateUrl: './template-shop.html'
})
export class TemplateShop implements AfterViewInit {
    publishTemplates: FirebaseListObservable<any>;
    tagSubject: Subject<any>;

    filterByTag(tag: string) {
        this.tagSubject.next(tag);
    }

    constructor(private af: AngularFire) {
        this.tagSubject = new Subject();
        this.publishTemplates = this.af.database.list('publish', {
            query: {
                orderByChild: 'tag',
                equalTo: this.tagSubject
            }
        });
    }

    ngAfterViewInit() {
        this.tagSubject.next(undefined);
    }
}
