import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';


@Component({
    templateUrl: './sign-up.html'
})
export class SignUpPage {
    user: User = {
        username: "",
        password: "",
        nickname: "",
        birthday: new Date(),
        gender: "",
        websites: []
    };
    constructor(private af: AngularFire, private toast: ToastController) { }

    checkUsername() {
        this.af.database.object(`users/${this.user.username}`, { preserveSnapshot: true }).subscribe(user => {
            // 用户存在,提醒用户名已使用
            if (user.val()) {
                console.log(user.val());
                let toast = this.toast.create({
                    message: '该用户已存在',
                    duration: 3000
                });
                toast.present();
            }
        })
    }


    checkPassword(repeatPassword) {
        if (this.user.password != repeatPassword) {
            this.toast.create({ message: '密码不一致', duration: 3000 }).present();
        };
    }
    signUp() {
        var uploadUser = {};
        uploadUser[this.user.username] = this.user;
        this.af.database.object('users').set(uploadUser);

        this.af.database.object('/users').subscribe(users => {
            console.log(users);
        });
    }
}