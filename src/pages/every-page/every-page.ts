import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AngularFire } from 'angularfire2';

@Component({
    templateUrl: './every-page.html'
})
export class EveryPage {
    user: User;
    constructor(navParams: NavParams, af: AngularFire) {
        var username = navParams.get('SLD');
        var password = navParams.get('username');
        af.database.object(`users/${username}`).subscribe(user => {
            if (user.password == password) {
                this.user = this.user

            } else {
                alert('用户错误');
            }
        });
    }




}
