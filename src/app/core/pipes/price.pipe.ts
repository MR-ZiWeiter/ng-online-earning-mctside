import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: number, type: 'price' | 'format' = 'price', args?: any): string {
    if (type === 'price') {
      return (value / 100).toFixed(2) || '0.00';
    } else if (type === 'format') {
      return value.toFixed(2) || '0.00';
    } else {
      return value.toFixed(2);
    }
  }

}
