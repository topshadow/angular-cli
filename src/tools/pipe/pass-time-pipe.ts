import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'passTime'
})
export class PassTimePipe implements PipeTransform {
    transform(publishTime: number, option: any): Date {
        var currentTime = new Date().getTime()
        var time = currentTime - publishTime;
        return new Date(time);
    }
}