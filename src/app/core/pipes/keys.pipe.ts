import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keysValues: { label: string; value: any; }[] = [];
    Object.keys(value).map(key => {
      keysValues.push({
        label: key,
        value: value[key]
      })
    })
    return keysValues;
  }

}
