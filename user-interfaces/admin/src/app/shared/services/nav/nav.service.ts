import {Event, NavigationEnd, Router} from '@angular/router';
import {EventEmitter, Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public sidenav: any;
  // @ts-ignore
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    this.sidenav?.close();
  }

  public openNav() {
    this.sidenav?.open();
  }

  public toggleNav() {
    this.sidenav?.toggle();
  }
}
