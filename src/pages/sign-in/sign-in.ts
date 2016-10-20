import { EveryPage } from '../every-page/every-page';
import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { AngularFire } from 'angularfire2';
import { ToastController, NavController, Events } from 'ionic-angular';

@Component({
    templateUrl: './sign-in.html'
})
export class SignInPage implements OnInit {
    user: User = {
        username: "",
        password: ""
    };

    constructor(private af: AngularFire,
        public events: Events,
        private toast: ToastController,
        private navController: NavController) { }

    ngOnInit() {
        this.user.username = "2345";
        this.user.password = "234";
        this.signIn();
    }
    signIn() {

        this.af.database.object(`users/${this.user.username}`, { preserveSnapshot: true }).subscribe(user => {

            if (user.val()) {
                if (this.user.password == user.val().password) {
                    this.navController.setRoot(EveryPage, { username: this.user.username, password: this.user.password });
                    this.events.publish('login:successfully', user.val());
                    localStorage.setItem('username', user.val().username);
                } else {
                    // debugger;
                    this.toast.create({ message: '密码错误', duration: 3000 }).present();
                }
            } else {
                this.toast.create({ message: '该用户不存在', duration: 3000 }).present();
            }
        });
    }

}