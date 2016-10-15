import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'number2Date'
})
export class NumberDatePip implements PipeTransform {
    transform(value: number, setting: string): Date {
        return new Date(value);
    }
}