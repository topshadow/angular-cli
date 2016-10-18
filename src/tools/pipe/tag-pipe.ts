import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tag'
})
export class TagPipe implements PipeTransform {
    transform(value: Website[], option: string) {
        return value.filter(website => {
            return website.tag;
        });
    }

}