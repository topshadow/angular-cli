import { PcSignIn } from '../pc-sign-in/pc-sign-in';
import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
    templateUrl: './pc-sign-up.html'
})
export class PcSignUp {
    user: { username: '', password: '' };
    constructor(private af: AngularFire) {

    }

    checkRepeatPassword(repeatPassword: string) {
        if (this.user.password != repeatPassword) {
            alert('密码不一致')
        } else {
            this.signUp();
        }

    }

    signUp() {
        if ((!this.user.username) || (!this.user.password)) {
            this.af.database.object(`users`).update(this.user);
        }
    }
}