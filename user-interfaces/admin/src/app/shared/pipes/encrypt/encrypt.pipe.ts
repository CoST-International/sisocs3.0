import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encrypt'
})
export class EncryptPipe implements PipeTransform {

  transform(value: any): any {
    let left = '';
    let right = '';
    const hexString = (typeof value === 'string' && value !== null && value !== undefined) ? (parseInt(value)).toString(32) : value.toString(32);
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    for (let i = 0; i < 3; i++) {
      left += possible.charAt(Math.floor(Math.random() * possible.length));
      right += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    const output = left.concat(hexString, right);
    return output;
  }

}
