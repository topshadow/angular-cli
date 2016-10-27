import { Pipe, PipeTransform, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
    name: 'htmlsafe'
})
export class HTMLSafePipe implements PipeTransform {
    constructor(private domsafe: DomSanitizer) { }

    transform(value: any, options: any) {
        return this.domsafe.bypassSecurityTrustHtml(value);
    }

}