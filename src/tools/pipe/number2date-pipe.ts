import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'number2date'
})
export class NumberDatePip implements PipeTransform {
    transform(value: number, setting: string): Date {
        return new Date(value);
    }
}