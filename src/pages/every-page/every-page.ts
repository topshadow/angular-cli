import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AngularFire } from 'angularfire2';

@Component({
    templateUrl: './every-page.html'
})
export class EveryPage {
    user: User;
    constructor(navParams: NavParams, af: AngularFire) {
        var username = navParams.get('username');
        var password = navParams.get('password');
        af.database.object(`users/${username}`).subscribe(user => {
            if (user.password == password) {
                this.user = this.user

                debugger;
            } else {
                alert('用户错误');
            }
        });
    }




}
