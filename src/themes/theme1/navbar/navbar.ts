import { Component, Input,ElementRef } from '@angular/core';

@Component({
    selector: 'theme1-navbar',
    templateUrl: './navbar.html'
})
export class Theme1Navbar {
    @Input() data = {
        content: {
            phone: '+0123 456 70 90'
        }
    };

    constructor() { }




}