import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }
  
  scrollTop() {
    return window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
