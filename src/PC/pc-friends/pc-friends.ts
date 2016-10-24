import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
@Component({
    selector: 'pc-friends',
    templateUrl: './pc-friends.html'
})
export class PcFriends {

    constructor(private ap: AngularFire) { }

}