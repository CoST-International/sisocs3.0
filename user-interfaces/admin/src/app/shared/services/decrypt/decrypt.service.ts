import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecryptService {
  value!: number;

  constructor() { }
  
  decrypt(url: string) {
    const id = url.slice(3, -3);
    this.value = parseInt(id, 32);
    return this.value;
  }
}
