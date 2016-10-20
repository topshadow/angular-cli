import { Component } from '@angular/core';


@Component({
    templateUrl: './404.page.html'
})
export class Page404 {
    coutTime: number;

    couterInterval: number;
    constructor() {
        this.coutTime = 7;
        this.couterInterval = setInterval(() => {
            if (this.coutTime > 0) {
                this.coutTime--;
            } else {
                location.href = location.hostname;
            }
        }, 1000)
    }

}