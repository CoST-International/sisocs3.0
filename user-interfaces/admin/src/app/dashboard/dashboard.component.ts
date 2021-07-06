import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IUser, IUserAttributes } from '../shared/interfaces/user/IUser';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { AfterViewInit } from '@angular/core';
import { AuthService } from '../auth/_services/auth.service';
import { IOrganizationAttributes } from '../shared/interfaces/organization/IOrganization';
import { MatSidenav } from '@angular/material/sidenav';
import { NavService } from '../shared/services/nav/nav.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sidenav: ElementRef | undefined;

  isRequestLoading: boolean = false;

  userOrganization!: any;
  user!: IUserAttributes;

  constructor(
    private router: Router,
    public _navService: NavService,
    public _authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userOrganization = this._authService.getUserOrganization()['organization'];
    this.user = JSON.parse(this._authService.getUser());
  }

  routeTo(link: string): void {
    this.router.navigate([link]);
    this._navService.closeNav();
  }

  ngAfterViewInit(): void {
    this._navService.sidenav = this.sidenav;
  }

  logout(): void {
    this.isRequestLoading = true;
    this._authService.logout(this.user).subscribe(
      (response) => {
        this.isRequestLoading = false;
      },
      (error) => {
        this.isRequestLoading = false;
      }
    )
  }

  viewProfile() {
    this.router.navigate(['dashboard/profile'])
  }


}
