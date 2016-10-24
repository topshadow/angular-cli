import { PcMyWebsite } from '../pc-my-website/pc-my-website';
import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { NavController } from 'ionic-angular';

@Component({
    templateUrl: './pc-sign-in.html'
})
export class PcSignIn {
    user: User = { username: '', password: '' }
    errorMsg: string = "";
    constructor(private af: AngularFire,
        private navCtrl: NavController) {

    }
    signIn() {
        if ((!this.user.username) || (!this.user.password)) {
            this.errorMsg = "信息不完全";
            setTimeout(() => { this.errorMsg = null; }, 3000);
        } else {

            this.af.database.object(`users/${this.user.username}`).subscribe(user => {

                if (user.password == this.user.password) {
                    localStorage.setItem('username', user.username);
                    this.navCtrl.setRoot(PcMyWebsite, user);
                } else {

                }

            })
        }
    }
}