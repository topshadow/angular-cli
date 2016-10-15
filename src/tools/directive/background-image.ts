import { Directive, ElementRef, Input, AfterViewInit, HostListener } from '@angular/core';

@Directive({
    selector: '[background-image]'
})
export class BackgroundImageDirective implements AfterViewInit {

    constructor(public el: ElementRef) {


    }

    @Input('background-image') backgroundImage: string;

    ngAfterViewInit() {
        if (this.backgroundImage.indexOf('url(') == -1) {
            this.backgroundImage = `url(${this.backgroundImage})`;
        }
        window['$'](this.el.nativeElement).css('background-image', this.backgroundImage);
    }


}
